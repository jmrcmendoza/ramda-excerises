/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import Chance from 'chance';
import R from 'ramda';
import server from '../../../../src';
import promoEnrollmentRequestsDB from '../../../../src/data-access/promo-enrollment-requests';
import memberDB from '../../../../src/data-access/members';
import promoDB from '../../../../src/data-access/promos';

const chance = new Chance();

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
});
