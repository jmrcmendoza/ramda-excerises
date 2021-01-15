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

    this.getToken = async () => {
      const data = {
        query: `mutation { authenticate(input: { username:"Jason", password:"1234" }){ token } }`,
      };

      const response = await this.request().post('/graphql').send(data);

      return response.body.data.authenticate.token;
    };
  });

  describe('Add vendor', () => {
    context('Given incorrect values', () => {
      it('should return error for null vendor name', async function () {
        const token = await this.getToken();

        const data = {
          query: `mutation { createVendor(input:{ name:null, type:${VendorType.Seamless}}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.body).to.have.property('errors');
      });

      it('should return error for null vendor type', async function () {
        const token = await this.getToken();

        const data = {
          query: `mutation { createVendor(input:{ name:${chance.name()}, type:null}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.body).to.have.property('errors');
      });
    });

    context('Given correct values', () => {
      it('should insert vendor', async function () {
        const token = await this.getToken();
        const data = {
          query: `mutation { createVendor(input:{ name:"${chance.name()}", type:${
            VendorType.Seamless
          }}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response).to.have.property('status', 200);
        expect(response.body.data.createVendor).to.be.true;
      });
    });

    context('Given invalid token', () => {
      it('should throw an error for forbidden', async function () {
        const data = {
          query: `mutation { createVendor(input:{ name:"${chance.name()}", type:${
            VendorType.Seamless
          }}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .set('authorization', 'Bearer token')
          .send(data);

        expect(response.body).to.have.property('errors');
      });
    });
  });

  describe('List Vendors', () => {
    it('should return all vendors', async function () {
      const data = {
        query: `{ vendors { id name type } }`,
      };

      const response = await this.request().post('/graphql').send(data);

      expect(response.body.data).to.exist;
      expect(response.body.data.vendors)
        .to.be.an('array')
        .that.has.length.greaterThan(0);
    });

    it('should return one vendor', async function () {
      let data = {
        query: `{ vendors { id name type } }`,
      };

      const vendors = await this.request().post('/graphql').send(data);

      const lastVendorId = R.compose(
        R.prop('id'),
        R.last,
      )(vendors.body.data.vendors);

      data = {
        query: `{ vendor(id:"${lastVendorId}") { id name type } }`,
      };

      const response = await this.request().post('/graphql').send(data);

      expect(response.body.data.vendor).to.exist;
      expect(response.body.data.vendor).to.be.an('object');
    });
  });

  describe('Edit Vendor', () => {
    context('Given incorrect values', () => {
      it('should throw error for null name', async function () {
        let data = {
          query: `{ vendors { id name type } }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendorId = R.compose(
          R.prop('id'),
          R.last,
        )(vendors.body.data.vendors);

        data = {
          query: `mutation { updateVendor(id:"${lastVendorId}", input:{ name:null, type:${VendorType.Seamless}}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });

      it('should throw error for null type', async function () {
        let data = {
          query: `{ vendors { id name type } }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendorId = R.compose(
          R.prop('id'),
          R.last,
        )(vendors.body.data.vendors);

        data = {
          query: `mutation { updateVendor(id:"${lastVendorId}", input:{ name:"${chance.name()}", type:null }) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });

      it('should throw error for invalid type', async function () {
        let data = {
          query: `{ vendors { id name type } }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendorId = R.compose(
          R.prop('id'),
          R.last,
        )(vendors.body.data.vendors);

        data = {
          query: `mutation { updateVendor(id:"${lastVendorId}", input:{ name:"${chance.name()}", type:"TEST" }) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });
    });

    context('Given correct values', () => {
      it('should update vendor', async function () {
        let data = {
          query: `{ vendors { id name type } }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendor = R.last(vendors.body.data.vendors);

        data = {
          query: `mutation { updateVendor(id:"${lastVendor.id}", input:{ name:"${lastVendor.name}", type:${VendorType.Transfer}}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.property('updateVendor', true);
      });
    });
  });

  describe('Delete Vendor', () => {
    it('should delete one vendor', async function () {
      let data = {
        query: `{ vendors { id name type } }`,
      };

      const vendors = await this.request().post('/graphql').send(data);

      const lastVendorId = R.compose(
        R.prop('id'),
        R.last,
      )(vendors.body.data.vendors);

      data = {
        query: `mutation { deleteVendor(id:"${lastVendorId}") }`,
      };

      const response = await this.request().post('/graphql').send(data);

      expect(response.body.data).to.have.property('deleteVendor', true);
    });
  });
});
