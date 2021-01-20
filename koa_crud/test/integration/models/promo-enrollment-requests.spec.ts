/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import Chance from 'chance';
import R from 'ramda';
import server from '../../../src';
import MemberModel from '../../../src/models/member';
import PromoModel from '../../../src/models/promo';
import PromoEnrollmentRequestModel, {
  PromoEnrollmentRequestStatus,
} from '../../../src/models/promo-enrollment-requests';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Promo Enrollment Request Model', () => {
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

        await expect(PromoEnrollmentRequestModel.create(data)).to.eventually
          .rejected;
      });

      it('should throw an error for empty member', async () => {
        const promo = await PromoModel.findOne({}).lean({ virtuals: true });

        const data = {
          promo: promo.id,
          member: '',
        };

        await expect(PromoEnrollmentRequestModel.create(data)).to.eventually
          .rejected;
      });
    });

    context('Given correct values', () => {
      it('should insert member', async () => {
        const member = await MemberModel.findOne({}).lean({ virtuals: true });
        const promo = await PromoModel.findOne({}).lean({ virtuals: true });

        const data = {
          promo: promo.id,
          member: member.id,
        };

        const result = await PromoEnrollmentRequestModel.create(data);

        expect(result).to.be.an('object');
        expect(result.status).to.equal(PromoEnrollmentRequestStatus.Pending);
      });
    });
  });

  describe('Process Promo Enrollment Request', () => {
    it('should process promo enrollment request', async () => {
      const promoEnrollmentRequest = await PromoEnrollmentRequestModel.findOne(
        {},
      ).lean({ virtuals: true });

      const result = await PromoEnrollmentRequestModel.findById(
        promoEnrollmentRequest.id,
        {
          status: PromoEnrollmentRequestStatus.Processing,
        },
        {
          useFindAndModify: false,
        },
      );

      expect(result).to.exist;
      expect(result).to.be.an('object');
      expect(result.status).to.equal(PromoEnrollmentRequestStatus.Processing);
    });
  });

  describe('Approve Promo Enrollment Request', () => {
    it('should approve promo enrollment request', async () => {
      const promoEnrollmentRequest = await PromoEnrollmentRequestModel.findOne(
        {},
      ).lean({ virtuals: true });

      const result = await PromoEnrollmentRequestModel.findById(
        promoEnrollmentRequest.id,
        {
          status: PromoEnrollmentRequestStatus.Approved,
        },
        {
          useFindAndModify: false,
        },
      );

      expect(result).to.exist;
      expect(result).to.be.an('object');
      expect(result.status).to.equal(PromoEnrollmentRequestStatus.Approved);
    });
  });
});
