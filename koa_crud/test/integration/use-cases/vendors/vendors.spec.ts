/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import Chance from 'chance';
import server from '../../../../src';

import {
  deleteVendor,
  insertVendor,
  listVendors,
  selectVendor,
  updateVendor,
} from '../../../../src/use-cases/vendors';

import { VendorType } from '../../../../src/models/vendor';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Vendor Use Case', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Add Vendor', () => {
    context('Given incorrect values', () => {
      it('should throw an error for null vendor name', async () => {
        const data = {
          name: '',
          type: VendorType.Seamless,
        };

        await expect(insertVendor(data)).to.eventually.rejectedWith(
          'Vendor name must be provided.',
        );
      });

      it('should throw an error for null vendor type', async () => {
        const data = {
          name: chance.name(),
          type: '',
        };

        await expect(insertVendor(data)).to.eventually.rejectedWith(
          'Vendor type must be provided.',
        );
      });
    });

    context('Given correct values', () => {
      it('should insert and return vendor values', async () => {
        const data = {
          name: chance.name(),
          type: VendorType.Transfer,
        };

        const result = await insertVendor(data);

        expect(result).to.exist;
        expect(result).to.be.true;
      });
    });
  });

  describe('List Vendors', () => {
    it('should return all vendors', async () => {
      const result = await listVendors();

      expect(result).to.exist;
      expect(result).to.be.an('array');
      expect(result).to.have.length.greaterThan(0);
    });

    it('should return one vendors', async () => {
      const vendors = await listVendors();

      const lastVendor = R.last(vendors);

      const result = await selectVendor(lastVendor._id);

      expect(result).to.exist;
      expect(result).to.be.an('object');
    });
  });

  describe('Edit Vendor', () => {
    context('Given invalid values', () => {
      it('should throw an error for null vendor name', async () => {
        let data = {
          name: chance.name(),
          type: VendorType.Seamless,
        };

        const createdVendor = await insertVendor(data);

        data = {
          name: '',
          type: VendorType.Seamless,
        };

        await expect(
          updateVendor(createdVendor.result._id, data),
        ).to.eventually.rejectedWith('Vendor name must be provided.');
      });

      it('should throw an error for null vendor type', async () => {
        let data = {
          name: chance.name(),
          type: VendorType.Seamless,
        };

        const createdVendor = await insertVendor(data);

        data.type = '';

        await expect(
          updateVendor(createdVendor.result._id, data),
        ).to.eventually.rejectedWith('Vendor type must be provided.');
      });
    });
  });

  describe('Delete Vendor', () => {
    context('Given correct values', () => {
      it('should delete one vendor', async () => {
        const data = {
          name: chance.name(),
          type: 'SEAMLESS',
        };

        const createdVendor = await insertVendor(data);

        const res = await deleteVendor(createdVendor.result._id);

        expect(res.result).to.be.true;
      });
    });
  });
});
