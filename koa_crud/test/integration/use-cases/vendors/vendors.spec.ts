/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import server from '../../../../src';

import {
  deleteVendor,
  insertVendor,
  listVendors,
  selectVendor,
  updateVendor,
} from '../../../../src/use-cases/vendors';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

before(function () {
  this.request = () => chai.request(server);
});

describe('Vendor Use Case', () => {
  describe('Add Vendor', () => {
    context('Given incorrect values', () => {
      it('should throw an error for null vendor name', async () => {
        const data = {
          name: '',
          type: 'SEAMLESS',
        };

        await expect(insertVendor(data)).to.eventually.rejectedWith(
          'Vendor name must be provided.',
        );
      });

      it('should throw an error for null vendor type', async () => {
        const data = {
          name: 'Use Case Vendor 1',
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
          name: 'Use Case Vendor 2',
          type: 'TRANSFER',
        };

        const res = await insertVendor(data);

        expect(res.result).to.exist;
        expect(res.result).to.be.an('object');
      });
    });
  });

  describe('List Vendors', () => {
    it('should return all vendors', async () => {
      const result = await listVendors();

      expect(result.vendors).to.exist;
      expect(result.vendors).to.be.an('array');
    });

    it('should return one vendors', async () => {
      const data = {
        name: 'Use Case Vendor 3',
        type: 'SEAMLESS',
      };

      const createdVendor = await insertVendor(data);

      const result = await selectVendor(createdVendor.result._id);

      expect(result.vendor).to.exist;
      expect(result.vendor).to.be.an('object');
    });
  });

  describe('Edit Vendor', () => {
    context('Given invalid values', () => {
      it('should throw an error for null vendor name', async () => {
        let data = {
          name: 'Use Case Vendor 4',
          type: 'SEAMLESS',
        };

        const createdVendor = await insertVendor(data);

        data = {
          name: '',
          type: 'SEAMLESS',
        };

        await expect(
          updateVendor(createdVendor.result._id, data),
        ).to.eventually.rejectedWith('Vendor name must be provided.');
      });

      it('should throw an error for null vendor type', async () => {
        let data = {
          name: 'Use Case Vendor 5',
          type: 'SEAMLESS',
        };

        const createdVendor = await insertVendor(data);

        data = {
          name: 'Use Case Vendor 5',
          type: '',
        };

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
          name: 'Use Case Vendor 6',
          type: 'SEAMLESS',
        };

        const createdVendor = await insertVendor(data);

        const res = await deleteVendor(createdVendor.result._id);
        expect(res).to.eql({ n: 1, ok: 1, deletedCount: 1 });
      });
    });
  });
});
