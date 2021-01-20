/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import Chance from 'chance';
import server from '../../../../src';
import {
  approvePromoEnrollmentRequest,
  enrollToPromo,
  listPromoEnrollmentRequests,
  processPromoEnrollmentRequest,
  selectOnePromoEnrollmentRequest,
} from '../../../../src/use-cases/promo-enrollment-requests';
import MemberModel from '../../../../src/models/member';
import PromoModel, {
  PromoStatus,
  PromoTemplate,
} from '../../../../src/models/promo';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Promo Enrollment Request Use Cases', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Enroll to Promo', () => {
    context('Given incorrect values', () => {
      it('should throw an error for empty promo', async () => {
        const member = await MemberModel.findOne({}).lean({ virtuals: true });

        const data = {
          promo: '',
          member: member.id,
        };

        await expect(enrollToPromo(data)).to.eventually.rejectedWith(
          'Promo must be provided.',
        );
      });

      it('should throw an error for empty member', async () => {
        const promo = await PromoModel.findOne({}).lean({ virtuals: true });

        const data = {
          promo: promo.id,
          member: '',
        };

        await expect(enrollToPromo(data)).to.eventually.rejectedWith(
          'Member must be provided.',
        );
      });
    });

    context('Given correct values', () => {
      it('should throw an error for enrolling to draft promo', async () => {
        const member = await MemberModel.findOne({}).lean({ virtuals: true });
        const promo = await PromoModel.findOne({
          status: PromoStatus.Draft,
        }).lean({ virtuals: true });

        const data = {
          promo: promo.id,
          member: member.id,
        };

        await expect(enrollToPromo(data)).to.eventually.rejectedWith(
          'Cannot enroll to Inactive/Draft promo.',
        );
      });

      it('should throw an error member missing field', async () => {
        const member = await MemberModel.create({
          username: chance.last(),
          password: chance.string({ length: 5 }),
        });
        const promo = await PromoModel.create({
          name: chance.name(),
          template: PromoTemplate.SignUp,
          title: chance.word(),
          description: chance.sentence(),
          requiredMemberFields: ['EMAIL'],
          status: PromoStatus.Active,
        });

        const data = {
          promo: promo._id,
          member: member._id,
        };

        await expect(enrollToPromo(data)).to.eventually.rejectedWith(
          'EMAIL member field is missing.',
        );
      });

      it('should enroll to a promo', async () => {
        const member = await MemberModel.create({
          username: chance.last(),
          password: chance.string({ length: 5 }),
        });
        const promo = await PromoModel.create({
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: 500,
          status: PromoStatus.Active,
        });

        const data = {
          promo: promo._id,
          member: member._id,
        };

        const result = await enrollToPromo(data);

        expect(result).to.be.true;
      });
    });
  });

  describe('List Promo Enrollment Requests', () => {
    it('should return all promo enrollment requests', async () => {
      const result = await listPromoEnrollmentRequests();

      expect(result).to.exist;
      expect(result).to.be.an('array');
      expect(result).to.have.length.greaterThan(0);
    });

    it('should return one promo enrollment request', async () => {
      const promoEnrollmentRequests = await listPromoEnrollmentRequests();

      const lastpromoEnrollmentRequestId = R.compose(
        R.prop('id'),
        R.last,
      )(promoEnrollmentRequests);

      const result = await selectOnePromoEnrollmentRequest(
        lastpromoEnrollmentRequestId,
      );

      expect(result).to.exist;
      expect(result).to.be.an('object');
      expect(result.id).to.equal(lastpromoEnrollmentRequestId);
    });
  });

  describe('Process Enrollment Request', () => {
    it('should throw and error for empty id', async () => {
      await expect(
        processPromoEnrollmentRequest(''),
      ).to.eventually.rejectedWith('ID must be provided.');
    });

    it('should process request and return true', async () => {
      const promoEnrollmentRequests = await listPromoEnrollmentRequests();

      const lastPromoEnrollmentRequestId = R.compose(
        R.prop('id'),
        R.last,
      )(promoEnrollmentRequests);

      const result = await processPromoEnrollmentRequest(
        lastPromoEnrollmentRequestId,
      );

      expect(result).to.be.true;
    });
  });

  describe('Approve Enrollment Request', () => {
    it('should throw and error for empty id', async () => {
      await expect(
        approvePromoEnrollmentRequest(''),
      ).to.eventually.rejectedWith('ID must be provided.');
    });

    it('should approve request and return true', async () => {
      const promoEnrollmentRequests = await listPromoEnrollmentRequests();

      const lastPromoEnrollmentRequestId = R.compose(
        R.prop('id'),
        R.last,
      )(promoEnrollmentRequests);

      const result = await approvePromoEnrollmentRequest(
        lastPromoEnrollmentRequestId,
      );

      expect(result).to.be.true;
    });
  });
});
