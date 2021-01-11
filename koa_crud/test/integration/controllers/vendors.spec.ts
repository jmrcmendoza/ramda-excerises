/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import server from '../../../src';
import { VendorType } from '../../../src/models/vendor';
import {
  getOneVendor,
  getVendors,
  postVendor,
} from '../../../src/controllers/vendors';

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
          body: { name: 'Controller Vendor', type: '' },
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
          body: { name: 'Vendor Controller 1', type: VendorType.Seamless },
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
  });
});
