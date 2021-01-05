import { expect } from 'chai';
import { isLastInStock, averageDollarValue } from '..';

describe('RamdaJS - exercise', () => {
  it('should return last car stock status', async function () {
    expect(isLastInStock).to.equal(false);
  });

  it('should return the cars average dollar value', () => {
    expect(averageDollarValue).to.equal(1816666.6666666666666666666666667);
  });
});
