import { expect } from 'chai';
import { isLastInStock } from '..';

describe('RamdaJS - exercise', () => {
  it('should return last car stock status', async function () {
    expect(isLastInStock).to.equal(false);
  });
});
