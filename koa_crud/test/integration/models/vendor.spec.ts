/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import server from '../../../src';
import VendorModel, { VendorType } from '../../../src/models/vendor';
import Chance from 'chance';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Vendor Model', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Create Vendor', () => {
    context('Given incorrect values', () => {
      it('should throw an error for empty type', async () => {
        const data = {
          name: chance.name(),
          type: '',
        };

        await expect(VendorModel.create(data)).to.eventually.rejectedWith(
          'Vendor validation failed: type: Path `type` is required.',
        );
      });

      it('should throw an error for empty name', async () => {
        const data = {
          name: '',
          type: VendorType.Seamless,
        };

        await expect(VendorModel.create(data)).to.eventually.rejectedWith(
          'Vendor validation failed: name: Path `name` is required.',
        );
      });
    });

    context('Given correct values', () => {
      it('should insert', async () => {
        const data = {
          name: chance.name(),
          type: VendorType.Transfer,
        };

        const result = await VendorModel.create(data);

        expect(result).to.be.an('object');
        expect(result.name).to.equal(data.name);
      });
    });
  });
});
