/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import R from 'ramda';
import { MemberFields, PromoTemplate } from '../../../../src/models/promo';

const chance = new Chance();

chai.use(chaiHttp);

describe('Member End-Points', () => {
  before(function () {
    this.request = () => chai.request(`http://localhost:3000`);
  });

  describe('Add Promo', () => {
    context('Given incorrect values', () => {
      it('should return error for empty name', async function () {
        const data = {
          name: '',
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        const response = await this.request()
          .post('/api/promos')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal('Promo name must be provided.');
      });

      it('should return error for empty template', async function () {
        const data = {
          name: chance.name(),
          template: '',
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        const response = await this.request()
          .post('/api/promos')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal('Template must be provided.');
      });

      it('should return error for invalid template', async function () {
        const data = {
          name: chance.name(),
          template: 'Test',
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        const response = await this.request()
          .post('/api/promos')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal('Invalid template.');
      });

      it('should return error for empty title', async function () {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: '',
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        const response = await this.request()
          .post('/api/promos')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal('Promo title must be provided');
      });

      it('should return error for empty description', async function () {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: '',
          minimumBalance: chance.prime(),
        };

        const response = await this.request()
          .post('/api/promos')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal(
          'Description must be provided.',
        );
      });

      it('should return error for empty balance given the template is deposit', async function () {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: null,
        };

        const response = await this.request()
          .post('/api/promos')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal(
          'Minimum balance must be provided.',
        );
      });

      it('should return error for empty member fields given the template is sign up', async function () {
        const data = {
          name: chance.name(),
          template: PromoTemplate.SignUp,
          title: chance.word(),
          description: chance.sentence(),
          requiredMemberFields: [],
        };

        const response = await this.request()
          .post('/api/promos')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal(
          'Members fields must be provided.',
        );
      });

      it('should return error for invalid member fields given the template is sign up', async function () {
        const data = {
          name: chance.name(),
          template: PromoTemplate.SignUp,
          title: chance.word(),
          description: chance.sentence(),
          requiredMemberFields: ['Test'],
        };

        const response = await this.request()
          .post('/api/promos')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal('Test is an invalid field.');
      });

      it('should return error for invalid status', async function () {
        const data = {
          name: chance.name(),
          template: PromoTemplate.SignUp,
          title: chance.word(),
          description: chance.sentence(),
          requiredMemberFields: [MemberFields.BANK_ACCOUNT],
          status: 'Test',
        };

        const response = await this.request()
          .post('/api/promos')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal('Invalid status.');
      });
    });

    context('Given correct values', () => {
      it('should insert promo', async function () {
        const data = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: chance.prime(),
        };

        const response = await this.request()
          .post('/api/promos')
          .type('json')
          .send(data);

        expect(response.status).to.equal(201);
        expect(response.body).to.exist;
        expect(response.body).to.be.true;
      });
    });
  });
});
