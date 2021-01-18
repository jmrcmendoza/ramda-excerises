/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import Chance from 'chance';
import server from '../../../../src';
import {
  insertPromo,
  listPromos,
  selectPromo,
  updatePromo,
} from '../../../../src/use-cases/promos';
import {
  MemberFields,
  PromoStatus,
  PromoTemplate,
} from '../../../../src/models/promo';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Promo Use Case', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Add Promo', () => {
    context('Given incorrect values', () => {
      it('should throw an error for empty name', async () => {
        const data = {
          name: '',
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(insertPromo(data)).to.eventually.rejectedWith(
          'Promo name must be provided.',
        );
      });

      it('should throw an error for empty template', async () => {
        const data = {
          name: chance.name(),
          template: '',
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(insertPromo(data)).to.eventually.rejectedWith(
          'Template must be provided.',
        );
      });

      it('should throw an error for invalid template', async () => {
        const data = {
          name: chance.name(),
          template: 'Test',
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(insertPromo(data)).to.eventually.rejectedWith(
          'Invalid template.',
        );
      });

      it('should throw an error for empty title', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: '',
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        await expect(insertPromo(data)).to.eventually.rejectedWith(
          'Promo title must be provided',
        );
      });

      it('should throw an error for empty description', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: '',
          minimumBalance: chance.prime(),
        };

        await expect(insertPromo(data)).to.eventually.rejectedWith(
          'Description must be provided.',
        );
      });

      it('should throw an error for empty minimum balance given template is deposit', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: null,
        };

        await expect(insertPromo(data)).to.eventually.rejectedWith(
          'Minimum balance must be provided.',
        );
      });

      it('should throw an error for empty promo fields given template is sign up', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.SignUp,
          title: chance.word(),
          description: chance.sentence(),
          requiredMemberFields: [],
        };

        await expect(insertPromo(data)).to.eventually.rejectedWith(
          'Members fields must be provided.',
        );
      });

      it('should throw an error for invalid promo fields given template is sign up', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.SignUp,
          title: chance.word(),
          description: chance.sentence(),
          requiredMemberFields: ['Test'],
        };

        await expect(insertPromo(data)).to.eventually.rejectedWith(
          'Test is an invalid field.',
        );
      });

      it('should throw an error for invalid status', async () => {
        const data = {
          name: chance.name(),
          template: PromoTemplate.SignUp,
          title: chance.word(),
          description: chance.sentence(),
          requiredMemberFields: [MemberFields.REAL_NAME],
          status: 'Test',
        };

        await expect(insertPromo(data)).to.eventually.rejectedWith(
          'Invalid status.',
        );
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

        const result = await insertPromo(data);

        expect(result).to.exist;
        expect(result).to.be.true;
      });
    });
  });

  describe('List Promos', () => {
    it('should return all promos', async () => {
      const result = await listPromos();

      expect(result).to.exist;
      expect(result).to.be.an('array');
      expect(result).to.have.length.greaterThan(0);
    });

    it('should return one promo', async () => {
      const promo = await listPromos();

      const lastPromoId = R.compose(R.prop('id'), R.last)(promo);

      const result = await selectPromo(lastPromoId);

      expect(result).to.exist;
      expect(result).to.be.an('object');
    });
  });

  describe('Update Promo', () => {
    context('Given incorrect values', () => {
      it('should throw an error for empty name', async () => {
        const promos = await listPromos();

        const lastPromo = R.last(promos);

        const data = {
          name: '',
          template: PromoTemplate.Deposit,
          title: lastPromo.title,
          description: lastPromo.description,
          minimumBalance: chance.prime(),
        };

        await expect(
          updatePromo(lastPromo.id, data),
        ).to.eventually.rejectedWith('Promo name must be provided.');
      });

      it('should throw an error for empty template', async () => {
        const promos = await listPromos();

        const lastPromo = R.last(promos);

        const data = {
          name: lastPromo.name,
          template: null,
          title: lastPromo.title,
          description: lastPromo.description,
          minimumBalance: chance.prime(),
        };

        await expect(
          updatePromo(lastPromo.id, data),
        ).to.eventually.rejectedWith('Template must be provided.');
      });

      it('should throw an error for invalid template', async () => {
        const promos = await listPromos();

        const lastPromo = R.last(promos);

        const data = {
          name: lastPromo.name,
          template: 'Test',
          title: lastPromo.title,
          description: lastPromo.description,
          minimumBalance: chance.prime(),
        };

        await expect(
          updatePromo(lastPromo.id, data),
        ).to.eventually.rejectedWith('Invalid template.');
      });

      it('should throw an error for empty title', async () => {
        const promos = await listPromos();

        const lastPromo = R.last(promos);

        const data = {
          name: lastPromo.name,
          template: PromoTemplate.Deposit,
          title: '',
          description: lastPromo.description,
          minimumBalance: chance.prime(),
        };

        await expect(
          updatePromo(lastPromo.id, data),
        ).to.eventually.rejectedWith('Promo title must be provided');
      });

      it('should throw an error for empty description', async () => {
        const promos = await listPromos();

        const lastPromo = R.last(promos);

        const data = {
          name: lastPromo.name,
          template: PromoTemplate.Deposit,
          title: lastPromo.title,
          description: '',
          minimumBalance: chance.prime(),
        };

        await expect(
          updatePromo(lastPromo.id, data),
        ).to.eventually.rejectedWith('Description must be provided.');
      });

      it('should throw an error for empty minimum balance given the template is deposit', async () => {
        const promos = await listPromos();

        const lastPromo = R.last(promos);

        const data = {
          name: lastPromo.name,
          template: PromoTemplate.Deposit,
          title: lastPromo.title,
          description: lastPromo.description,
          minimumBalance: null,
        };

        await expect(
          updatePromo(lastPromo.id, data),
        ).to.eventually.rejectedWith('Minimum balance must be provided.');
      });

      it('should throw an error for empty member fields given the template is sign up', async () => {
        const promos = await listPromos();

        const lastPromo = R.last(promos);

        const data = {
          name: lastPromo.name,
          template: PromoTemplate.SignUp,
          title: lastPromo.title,
          description: lastPromo.description,
          requiredMemberFields: [],
        };

        await expect(
          updatePromo(lastPromo.id, data),
        ).to.eventually.rejectedWith('Members fields must be provided.');
      });

      it('should throw an error for invalid member fields given the template is sign up', async () => {
        const promos = await listPromos();

        const lastPromo = R.last(promos);

        const data = {
          name: lastPromo.name,
          template: PromoTemplate.SignUp,
          title: lastPromo.title,
          description: lastPromo.description,
          requiredMemberFields: ['Test'],
        };

        await expect(
          updatePromo(lastPromo.id, data),
        ).to.eventually.rejectedWith('Test is an invalid field.');
      });

      it('should throw an error for invalid status', async () => {
        const promos = await listPromos();

        const lastPromo = R.last(promos);

        const data = {
          name: lastPromo.name,
          template: PromoTemplate.SignUp,
          title: lastPromo.title,
          description: lastPromo.description,
          requiredMemberFields: [MemberFields.REAL_NAME],
          status: 'Test',
        };

        await expect(
          updatePromo(lastPromo.id, data),
        ).to.eventually.rejectedWith('Invalid status.');
      });
    });

    context('Given correct values', () => {
      it('should update promo and return true', async () => {
        const promos = await listPromos();

        const lastPromo = R.last(promos);

        const data = {
          name: lastPromo.name,
          template: PromoTemplate.Deposit,
          title: lastPromo.title,
          description: lastPromo.description,
          minimumBalance: chance.prime(),
          status: PromoStatus.Active,
        };

        const result = await updatePromo(lastPromo.id, data);

        expect(result).to.be.true;
      });
    });
  });
});
