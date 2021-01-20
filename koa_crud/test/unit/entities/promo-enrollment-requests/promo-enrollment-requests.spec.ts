import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import PromoModel from '../../../../src/models/promo';
import MemberModel from '../../../../src/models/member';
import { makePromoEnrollmentRequest } from '../../../../src/entities/promo-enrollment-requests';
import server from '../../../../src';

chai.use(chaiAsPromised);

describe('Promo Enrollment Request Entity', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  it('should throw an error for empty promo', async () => {
    const member = await MemberModel.findOne({}).lean({ virtuals: true });

    const data = {
      promo: '',
      member: member.id,
    };

    await expect(makePromoEnrollmentRequest(data)).to.eventually.rejectedWith(
      'Promo must be provided.',
    );
  });

  it('should throw an error for empty member', async () => {
    const promo = await PromoModel.findOne({}).lean({ virtuals: true });

    const data = {
      promo: promo.id,
      member: '',
    };

    await expect(makePromoEnrollmentRequest(data)).to.eventually.rejectedWith(
      'Member must be provided.',
    );
  });

  it('should return undefined', async () => {
    const promo = await PromoModel.findOne({}).lean({ virtuals: true });
    const member = await MemberModel.findOne({}).lean({ virtuals: true });

    const data = {
      promo: promo.id,
      member: member.id,
    };

    await expect(makePromoEnrollmentRequest(data)).to.eventually.be.fulfilled
      .and.be.undefined;
  });
});
