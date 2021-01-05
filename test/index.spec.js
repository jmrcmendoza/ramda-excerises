import { expect } from 'chai';
import { isLastInStock, averageDollarValue, fastestCar, totalPayout } from '..';

describe('RamdaJS - exercises', () => {
  describe('isLastInStock', () => {
    it('should return last car stock status', async function () {
      expect(isLastInStock).to.equal(false);
    });
  });

  describe('averageDollarValue', () => {
    it('should return the cars average dollar value', () => {
      expect(averageDollarValue).to.equal(1816666.6666666666666666666666667);
    });
  });

  describe('fastestCar', () => {
    it('should retrieve the fastest car', () => {
      expect(fastestCar).to.equal('Aston Martin One-100 is the fastest');
    });
  });

  describe('totalPayout', () => {
    it('should return the accounts total payout', () => {
      expect(totalPayout).to.deep.equal([{ acc_1: 3 }, { acc_2: 3 }]);
    });
  });
});
