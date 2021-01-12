/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import Chance from 'chance';
import R from 'ramda';
import server from '../../../../src';
import vendorsDB from '../../../../src/data-access/vendors';
import { VendorType } from '../../../../src/models/vendor';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Vendor Data Access', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Create a Vendor', async () => {
    context('Given values are incorrect', () => {
      it('should throw a validation error for empty vendor name', async () => {
        const data = {
          name: '',
          type: VendorType.Seamless,
        };

        await expect(vendorsDB.createVendor(data)).to.eventually.rejected;
      });

      it('should throw a validation error for empty vendor type', async () => {
        const data = {
          name: chance.name(),
          type: '',
        };

        await expect(vendorsDB.createVendor(data)).to.eventually.rejected;
      });

      it('should throw a validation error for invalid vendor type', async () => {
        const data = {
          name: chance.name(),
          type: 'Test Type',
        };

        await expect(vendorsDB.createVendor(data)).to.eventually.rejected;
      });
    });

    context('Given the values are correct', () => {
      it('should insert vendor and return the values', async () => {
        const data = {
          name: chance.name(),
          type: VendorType.Transfer,
        };

        const result = await vendorsDB.createVendor(data);

        expect(result).to.be.true;
      });
    });
  });

  describe('List Vendors', () => {
    it('should retrieve all vendors', async () => {
      const result = await vendorsDB.listVendors();

      expect(result).to.be.an('array');
      expect(result).has.length.greaterThan(0);
    });

    it('should retrieve one vendor', async () => {
      const vendors = await vendorsDB.listVendors();

      const lastVendor = R.last(vendors);

      const result = await vendorsDB.selectOneVendor(lastVendor._id);

      expect(result).to.exist;
      expect(result).to.be.an('object');
      expect(result).to.have.property('name', lastVendor.name);
    });
  });

  describe('Update Vendor', () => {
    context('Given values are correct', () => {
      it('should update vendor type', async () => {
        const vendors = await vendorsDB.listVendors();

        const lastVendor = R.last(vendors);

        const data = {
          name: lastVendor.name,
          type: VendorType.Transfer,
        };

        const result = await vendorsDB.updateVendor(lastVendor._id, data);

        expect(result).to.be.true;
      });
    });
  });

  describe('Delete Vendor', () => {
    it('should delete created vendor', async () => {
      const vendors = await vendorsDB.listVendors();

      const result = await vendorsDB.deleteVendor(
        R.compose(R.prop('_id'), R.last)(vendors),
      );

      expect(result).to.exist;
      expect(result).to.be.true;
    });
  });
});
