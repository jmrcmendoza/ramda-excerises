/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import server from '../../../src';
import { VendorType } from '../../../src/models/vendor';
import {
  delVendor,
  getOneVendor,
  getVendors,
  postVendor,
  putVendor,
} from '../../../src/controllers/vendors';

import Chance from 'chance';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Vendor Controller', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Create Vendor', () => {
    context('Given incorrect values', () => {
      it('should return 400 status code for empty type', async () => {
        const data = {
          body: { name: chance.name(), type: '' },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        await expect(postVendor(data)).to.eventually.fulfilled.property(
          'status',
          400,
        );
      });

      it('should return 400 status code for empty name', async () => {
        const data = {
          body: { name: '', type: VendorType.Seamless },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        await expect(postVendor(data)).to.eventually.fulfilled.property(
          'status',
          400,
        );
      });
    });

    context('Given correct values', () => {
      it('should insert vendor and return 201 status code', async () => {
        const data = {
          body: { name: chance.name(), type: VendorType.Seamless },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        await expect(postVendor(data)).to.eventually.fulfilled.property(
          'status',
          201,
        );
      });
    });
  });

  describe('List Vendors', () => {
    it('should retrieve all vendors and return 200 status code', async () => {
      const data = {
        body: {},
        headers: {
          'Content-Type': null,
          Referer: null,
          'User-Agent': null,
        },
      };

      const result = await getVendors();

      expect(result).property('status', 200);
      expect(result.body.vendors).length.greaterThan(0);
    });

    it('should retrieve one vendors and return 200 status code', async () => {
      const data = {
        params: {},
        body: {
          name: chance.name(),
          type: VendorType.Seamless,
        },
        headers: {
          'Content-Type': null,
          Referer: null,
          'User-Agent': null,
        },
      };

      const vendor = await postVendor(data);

      data.params = { id: vendor.body.result._id };

      const test = await getOneVendor(data);

      await expect(getOneVendor(data)).to.eventually.fulfilled.property(
        'status',
        200,
      );
    });
  });

  describe('Edit Vendor', () => {
    context('Given incorrect values', async () => {
      it('should return 400 status code for empty type', async () => {
        const data = {
          params: {},
          body: {
            name: chance.name(),
            type: VendorType.Seamless,
          },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        const vendor = await postVendor(data);

        data.params = { id: vendor.body.result._id };
        data.body.type = '';

        await expect(putVendor(data)).to.eventually.fulfilled.property(
          'status',
          400,
        );
      });

      it('should return 400 status code for empty name', async () => {
        const data = {
          params: {},
          body: {
            name: chance.name(),
            type: VendorType.Seamless,
          },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        const vendor = await postVendor(data);

        data.params = { id: vendor.body.result._id };
        data.body.name = '';

        await expect(putVendor(data)).to.eventually.fulfilled.property(
          'status',
          400,
        );
      });
    });

    context('Given correct values', () => {
      it('should create and update vendor', async () => {
        const data = {
          params: {},
          body: {
            name: chance.name(),
            type: VendorType.Seamless,
          },
          headers: {
            'Content-Type': 'application/json',
            Referer: null,
            'User-Agent': null,
          },
        };

        const vendor = await postVendor(data);

        data.params = { id: vendor.body.result._id };
        data.body.type = VendorType.Transfer;

        await expect(putVendor(data)).to.eventually.fulfilled.property(
          'status',
          200,
        );
      });
    });
  });

  describe('Delete Vendor', () => {
    it('should create and delete vendor and return status code of 200', async () => {
      const data = {
        params: {},
        body: {
          name: chance.name(),
          type: VendorType.Seamless,
        },
        headers: {
          'Content-Type': 'application/json',
          Referer: null,
          'User-Agent': null,
        },
      };

      const vendor = await postVendor(data);

      data.params = { id: vendor.body.result._id };

      await expect(delVendor(data)).to.eventually.fulfilled.property(
        'status',
        200,
      );
    });
  });
});
