/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import R from 'ramda';
import { VendorType } from '../../../../src/models/vendor';

const chance = new Chance();

chai.use(chaiHttp);

describe('Vendors', function () {
  before(function () {
    this.request = () => chai.request('http://localhost:3000');
  });

  describe('Add vendor', () => {
    context('Given incorrect values', () => {
      it('should return error for null vendor name', async function () {
        const data = {
          query: `mutation { createVendor(input:{ name:null, type:${VendorType.Seamless}}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });

      it('should return error for null vendor type', async function () {
        const data = {
          query: `mutation { createVendor(input:{ name:${chance.name()}, type:null}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });
    });

    context('Given correct values', () => {
      it('should insert vendor', async function () {
        const data = {
          query: `mutation { createVendor(input:{ name:"${chance.name()}", type:${
            VendorType.Seamless
          }}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response).to.have.property('status', 200);
        expect(response.body.data.createVendor).to.be.true;
      });
    });
  });
});
