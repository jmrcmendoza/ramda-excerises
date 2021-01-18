/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import Chance from 'chance';
import R from 'ramda';
import server from '../../../../src';
import promoDB from '../../../../src/data-access/promos';
import { PromoTemplate } from '../../../../src/models/promo';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Vendor Data Access', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Create a Promo', async () => {
    context('Given values are incorrect', () => {
      it('should throw a validation error for empty name', async () => {
        const data = {
          name: '',
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(promoDB.createPromo(data)).to.eventually.rejected;
      });

      it('should throw a validation error for empty template', async () => {
        const data = {
          name: chance.name(),
          template: '',
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(promoDB.createPromo(data)).to.eventually.rejected;
      });

      it('should throw a validation error for invalid template', async () => {
        const data = {
          name: chance.name(),
          template: 'Test',
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(promoDB.createPromo(data)).to.eventually.rejected;
      });

      it('should throw a validation error for empty title', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: '',
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(promoDB.createPromo(data)).to.eventually.rejected;
      });

      it('should throw a validation error for empty description', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: '',
          minimumBalance: chance.prime(),
        };

        await expect(promoDB.createPromo(data)).to.eventually.rejected;
      });
    });

    context('Given the values are correct', () => {
      it('should insert promo return true', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        const result = await promoDB.createPromo(data);

        expect(result).to.be.true;
      });
    });
  });
});
