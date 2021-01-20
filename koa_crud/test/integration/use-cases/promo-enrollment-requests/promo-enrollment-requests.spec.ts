/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import Chance from 'chance';
import server from '../../../../src';
import { enrollToPromo } from '../../../../src/use-cases/promo-enrollment-requests';
import MemberModel from '../../../../src/models/member';
import PromoModel, {
  MemberFields,
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
});
