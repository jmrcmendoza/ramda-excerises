import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { makeVendor } from '../../../../src/entities/vendors';

chai.use(chaiAsPromised);

describe('Entities - Vendor', () => {
  it('should throw an error for null vendor name', async () => {
    const data = {
      name: '',
      type: 'SEAMLESS',
    };

    expect(makeVendor(data)).to.eventually.rejectedWith(
      'Vendor name must be provided.',
    );
  });

  it('should throw an error for null vendor type', async () => {
    const data = {
      name: 'Vendor 1',
      type: '',
    };

    expect(makeVendor(data)).to.eventually.rejectedWith(
      'Vendor type must be provided.',
    );
  });
});
