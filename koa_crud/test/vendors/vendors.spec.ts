/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;

describe('Vendors', () => {
  let createdVendorId = null;

  describe('Add vendor', () => {
    it('should return error for null vendor name', async function () {
      const data = {
        name: undefined,
        type: 'SEEMLESS',
      };

      const response = await chai
        .request('http://localhost:3000')
        .post('/api/vendors')
        .type('json')
        .send(data);

      expect(response.status).to.equal(400);
      expect(response.body.errorMsg).to.equal('Vendor name must be provided.');
    });

    it('should return error for null vendor type', async function () {
      const data = {
        name: 'Vendor 2',
        type: undefined,
      };

      const response = await chai
        .request('http://localhost:3000')
        .post('/api/vendors')
        .type('json')
        .send(data);

      expect(response.status).to.equal(400);
      expect(response.body.errorMsg).to.equal('Vendor type must be provided.');
    });

    it('should insert new vendor', async function () {
      const data = {
        name: 'Vendor 2',
        type: 'SEEMLESS',
      };

      const response = await chai
        .request('http://localhost:3000')
        .post('/api/vendors')
        .type('json')
        .send(data);

      expect(response.status).to.equal(201);
      expect(response.body.result).to.exist;
      expect(response.body.result).to.be.an('object');

      createdVendorId = response.body.result._id;
    });
  });

  describe('List vendors', () => {
    it('should return all vendors', async function () {
      const response = await chai
        .request('http://localhost:3000')
        .get('/api/vendors');

      expect(response.body.vendors).to.exist;
      expect(response.body.vendors)
        .to.be.an('array')
        .that.has.length.greaterThan(0);
    });

    it('should return one vendor', async function () {
      const id = '5ff679a79de0a13d142d9fce';

      const response = await chai
        .request('http://localhost:3000')
        .get(`/api/vendors/${id}`);

      expect(response.body.vendor).to.exist;
      expect(response.body.vendor).to.be.an('object');
    });
  });

  describe('Edit vendor', () => {
    it('should return error for null vendor name', async function () {
      const data = {
        name: undefined,
        type: 'SEEMLESS',
      };

      await chai
        .request('http://localhost:3000')
        .put(`/api/vendors/${createdVendorId}`)
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errorMsg).to.equal('Vendor name must be provided.');
        });
    });

    it('should return error for null vendor type', async function () {
      const data = {
        name: 'Vendor 2',
        type: undefined,
      };

      await chai
        .request('http://localhost:3000')
        .put(`/api/vendors/${createdVendorId}`)
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errorMsg).to.equal('Vendor type must be provided.');
        });
    });

    it('should update vendor type', async function () {
      const data = {
        name: 'Vendor 2',
        type: 'TRANSFER',
      };

      await chai
        .request('http://localhost:3000')
        .put(`/api/vendors/${createdVendorId}`)
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.result).to.exist;
          expect(res.body.result).to.be.an('object');
        });
    });
  });

  describe('Delete vendor', () => {
    it('should delete one vendor', async function () {
      await chai
        .request('http://localhost:3000')
        .delete(`/api/vendors/${createdVendorId}`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.result).to.exist;
          expect(res.body.result).to.be.an('object');
          expect(res.body.result).to.eqls({
            n: 1,
            ok: 1,
            deletedCount: 1,
          });
        });
    });
  });
});
