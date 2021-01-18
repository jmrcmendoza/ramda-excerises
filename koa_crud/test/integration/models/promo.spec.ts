/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import Chance from 'chance';
import R from 'ramda';
import server from '../../../src';
import { PromoStatus, PromoTemplate } from '../../../src/models/promo';
import PromoModel from '../../../src/models/promo';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Promo Model', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Create Promo', () => {
    context('Given incorrect values', () => {
      it('should throw an error for empty name', async () => {
        const data = {
          name: '',
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(PromoModel.create(data)).to.eventually.rejected;
      });

      it('should throw an error for empty template', async () => {
        const data = {
          name: chance.name(),
          template: '',
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(PromoModel.create(data)).to.eventually.rejected;
      });

      it('should throw an error for invalid template', async () => {
        const data = {
          name: chance.name(),
          template: 'Test',
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(PromoModel.create(data)).to.eventually.rejected;
      });

      it('should throw an error for empty title', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: '',
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(PromoModel.create(data)).to.eventually.rejected;
      });

      it('should throw an error for empty description', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: '',
          minimumBalance: chance.prime(),
        };

        await expect(PromoModel.create(data)).to.eventually.rejected;
      });

      it('should throw an error for invalid status', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
          status: 'TEST',
        };

        await expect(PromoModel.create(data)).to.eventually.rejected;
      });
    });

    context('Given correct values', () => {
      it('should insert promo', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        const result = await PromoModel.create(data);

        expect(result).to.be.an('object');
        expect(result.name).to.equal(data.name);
        expect(result.status).to.equal(PromoStatus.Draft);
      });
    });
  });

  describe('Update Promo', () => {
    it('should update and return promo values', async () => {
      const promo = await PromoModel.findOne({}).lean({ virtuals: true });

      const data = {
        name: promo.name,
        template: PromoTemplate.Deposit,
        title: promo.title,
        description: promo.description,
        minimumBalance: chance.prime(),
        status: PromoStatus.Active,
      };

      const result = await PromoModel.findByIdAndUpdate(promo.id, data, {
        useFindAndModify: false,
      });

      expect(result).to.exist;
      expect(result).to.be.an('object');
    });
  });
});
