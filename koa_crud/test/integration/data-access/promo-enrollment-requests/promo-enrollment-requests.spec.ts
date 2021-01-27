/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import server from '@Server';
import promoEnrollmentRequestsDB from '@DataAccess/promo-enrollment-requests';
import memberDB from '@DataAccess/members';
import promoDB from '@DataAccess/promos';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Promo Data Access', () => {
  before(function () {
    this.request = () => chai.request(server);
  });
  describe('Enroll to Promo', async () => {
    context('Given values are incorrect', () => {
      it('should throw a validation error for empty promo', async () => {
        const members = await memberDB.listMembers();

        const lastMemberId = R.compose(R.prop('id'), R.last)(members);

        const data = {
          promo: '',
          member: lastMemberId,
        };

        await expect(promoEnrollmentRequestsDB.enrollToPromo(data)).to
          .eventually.rejected;
      });

      it('should throw a validation error for empty member', async () => {
        const promos = await promoDB.listPromos();

        const lastPromoId = R.compose(R.prop('id'), R.last)(promos);

        const data = {
          promo: lastPromoId,
          member: '',
        };

        await expect(promoEnrollmentRequestsDB.enrollToPromo(data)).to
          .eventually.rejected;
      });
    });

    context('Given the values are correct', () => {
      it('should enroll to a promo and return true', async () => {
        const promos = await promoDB.listPromos();
        const members = await memberDB.listMembers();

        const lastPromoId = R.compose(R.prop('id'), R.last)(promos);
        const lastMemberId = R.compose(R.prop('id'), R.last)(members);

        const data = {
          promo: lastPromoId,
          member: lastMemberId,
        };

        const result = await promoEnrollmentRequestsDB.enrollToPromo(data);

        expect(result).to.be.true;
      });
    });
  });

  describe('List Promo Enrollment Requests', () => {
    it('should retrieve all promo enrollment requests', async () => {
      const result = await promoEnrollmentRequestsDB.listPromoEnrollmentRequests();

      expect(result).to.be.an('array');
      expect(result).has.length.greaterThan(0);
    });

    it('should retrieve one promo', async () => {
      const promoEnrollmentRequests = await promoEnrollmentRequestsDB.listPromoEnrollmentRequests();

      const lastPromoEnrollmentRequest = R.last(promoEnrollmentRequests);

      const result = await promoEnrollmentRequestsDB.selectOnePromoEnrollmentRequest(
        lastPromoEnrollmentRequest.id,
      );

      expect(result).to.exist;
      expect(result).to.be.an('object');
      expect(result).to.have.property('id', lastPromoEnrollmentRequest.id);
    });
  });

  describe('Process Promo Enrollment Requests', () => {
    it('should process request and return true', async () => {
      const enrollmentRequests = await promoEnrollmentRequestsDB.listPromoEnrollmentRequests();

      const lastEnrollmentRequest = R.compose(
        R.prop('id'),
        R.last,
      )(enrollmentRequests);

      const result = await promoEnrollmentRequestsDB.processPromoEnrollmentRequest(
        lastEnrollmentRequest,
      );

      expect(result).to.be.true;
    });
  });

  describe('Approve Promo Enrollment Requests', () => {
    it('should process request and return true', async () => {
      const enrollmentRequests = await promoEnrollmentRequestsDB.listPromoEnrollmentRequests();

      const lastEnrollmentRequest = R.compose(
        R.prop('id'),
        R.last,
      )(enrollmentRequests);

      const result = await promoEnrollmentRequestsDB.approvePromoEnrollmentRequest(
        lastEnrollmentRequest,
      );

      expect(result).to.be.true;
    });
  });

  describe('Reject Promo Enrollment Requests', () => {
    it('should process request and return true', async () => {
      const enrollmentRequests = await promoEnrollmentRequestsDB.listPromoEnrollmentRequests();

      const lastEnrollmentRequest = R.compose(
        R.prop('id'),
        R.last,
      )(enrollmentRequests);

      const result = await promoEnrollmentRequestsDB.rejectPromoEnrollmentRequest(
        lastEnrollmentRequest,
      );

      expect(result).to.be.true;
    });
  });
});
