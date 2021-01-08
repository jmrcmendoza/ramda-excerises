import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { makeVendor } from '../../../../src/entities/vendors';
import { VendorType } from '../../../../src/models/vendor';

chai.use(chaiAsPromised);

describe('Entities - Vendor', () => {
  it('should throw an error for null vendor name', () => {
    const data = {
      name: '',
      type: VendorType.Seamless,
    };

    expect(makeVendor(data)).to.eventually.rejectedWith(
      'Vendor name must be provided.',
    );
  });

  it('should throw an error for null vendor type', () => {
    const data = {
      name: 'Vendor 1',
      type: '',
    };

    expect(makeVendor(data)).to.eventually.rejectedWith(
      'Vendor type must be provided.',
    );
  });

  it('should return undefined', async () => {
    const data = {
      name: 'Vendor 1',
      type: VendorType.Transfer,
    };

    await expect(makeVendor(data)).to.eventually.be.fulfilled;
  });
});
