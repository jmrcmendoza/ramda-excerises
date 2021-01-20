/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import R from 'ramda';
import promoDB from '../../../../src/data-access/promos';
import server from '../../../../src';
import { PromoStatus, PromoTemplate } from '../../../../src/models/promo';

const chance = new Chance();

chai.use(chaiHttp);

describe('Promos Graphql', function () {
  before(function () {
    this.request = () => chai.request(server);

    this.getToken = async () => {
      const data = {
        query: `mutation { authenticate(
          input: { 
            username:"Jason",
            password:"1234"
          }){ 
            token 
          }
        }`,
      };

      const result = await this.request().post('/graphql').send(data);

      return result.body.data.authenticate.token;
    };
  });

  describe('Enroll to Promo', () => {
    context('Given incorrect values', () => {
      it('should return error for empty promo', async function () {
        const data = {
          query: `mutation { enrollToPromo(
            promo:""
          )
        }`,
        };

        const result = await this.request().post('/graphql').send(data);

        expect(result.body).to.have.property('errors');

        const error = R.head(result.body.errors);

        expect(error.message).to.equal('Promo must be provided.');
      });

      it('should return error for empty member', async function () {
        const promos = await promoDB.listPromos();

        const lastPromoId = R.compose(R.prop('id'), R.last)(promos);

        const data = {
          query: `mutation { enrollToPromo(
            promo:"${lastPromoId}"
          )
        }`,
        };

        const result = await this.request().post('/graphql').send(data);

        expect(result.body).to.have.property('errors');

        const error = R.head(result.body.errors);

        expect(error.message).to.equal('Member must be provided.');
      });
    });

    context('Given correct values', () => {
      it('should return error for missing member fields', async function () {
        const token = await this.getToken();

        const promoDetails = {
          name: chance.name(),
          template: PromoTemplate.SignUp,
          title: chance.word(),
          description: chance.sentence(),
          requiredMemberFields: ['BANK_ACCOUNT'],
          status: PromoStatus.Active,
        };

        await promoDB.createPromo(promoDetails);

        const promos = await promoDB.listPromos();

        const lastPromoId = R.compose(R.prop('id'), R.last)(promos);

        const data = {
          query: `mutation { enrollToPromo(
            promo:"${lastPromoId}"
          )
        }`,
        };

        const result = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(result.body).to.have.property('errors');

        const error = R.head(result.body.errors);

        expect(error.message).to.equal('BANK_ACCOUNT member field is missing.');
      });

      it('should return error for enrolling to draft promo', async function () {
        const token = await this.getToken();

        const promoDetails = {
          name: chance.name(),
          template: PromoTemplate.SignUp,
          title: chance.word(),
          description: chance.sentence(),
          requiredMemberFields: ['BANK_ACCOUNT'],
        };

        await promoDB.createPromo(promoDetails);

        const promos = await promoDB.listPromos();

        const lastPromoId = R.compose(R.prop('id'), R.last)(promos);

        const data = {
          query: `mutation { enrollToPromo(
            promo:"${lastPromoId}"
          )
        }`,
        };

        const result = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(result.body).to.have.property('errors');

        const error = R.head(result.body.errors);

        expect(error.message).to.equal(
          'Cannot enroll to Inactive/Draft promo.',
        );
      });

      it('should enroll to a promo and return true', async function () {
        const token = await this.getToken();

        const promoDetails = {
          name: chance.name(),
          template: PromoTemplate.Deposit,
          title: chance.word(),
          description: chance.sentence(),
          minimumBalance: 500,
          status: PromoStatus.Active,
        };

        await promoDB.createPromo(promoDetails);

        const promos = await promoDB.listPromos();

        const lastPromoId = R.compose(R.prop('id'), R.last)(promos);

        const data = {
          query: `mutation { enrollToPromo(
            promo:"${lastPromoId}"
          )
        }`,
        };

        const result = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(result.body.data.enrollToPromo).to.be.true;
      });
    });

    context('Given invalid token', () => {
      it('should throw forbidden', async function () {
        const promos = await promoDB.listPromos();

        const lastPromoId = R.compose(R.prop('id'), R.last)(promos);

        const data = {
          query: `mutation { enrollToPromo(
            promo:"${lastPromoId}"
          )
        }`,
        };

        const result = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer token`);

        expect(result.body).to.have.property('errors');

        const error = R.head(result.body.errors);

        expect(error.message).to.equal('Forbidden');
      });
    });
  });
});
