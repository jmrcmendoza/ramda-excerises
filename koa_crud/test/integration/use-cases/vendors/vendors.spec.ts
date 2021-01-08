/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../src';
import { listVendors, selectVendor } from '../../../../src/use-cases/vendors';

chai.use(chaiHttp);

before(function () {
  this.request = () => chai.request(server);
});

describe('Vendor Use Case', () => {
  describe('List Vendors', () => {
    it('should return all vendors', async () => {
      const result = await listVendors();

      expect(result.vendors).to.exist;
      expect(result.vendors).to.be.an('array');
    });

    it('should return one vendors', async () => {
      const vendorId = '5ff7c54fd563991e1464d50d';
      const result = await selectVendor(vendorId);

      expect(result.vendor).to.exist;
      expect(result.vendor).to.be.an('object');
    });
  });
});
