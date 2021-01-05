import { expect } from 'chai';
import { isLastInStock, averageDollarValue, fastestCar, totalPayout } from '..';

describe('RamdaJS - exercises', () => {
  const cars = [
    {
      name: 'Aston Martin One-77',
      horsepower: 750,
      dollarValue: 1850000,
      inStock: true,
    },
    {
      name: 'Aston Martin One-100',
      horsepower: 800,
      dollarValue: 1900000,
      inStock: false,
    },
    {
      name: 'Aston Martin One-110',
      horsepower: 770,
      dollarValue: 1700000,
      inStock: true,
    },
    {
      name: 'Aston Martin One-50',
      horsepower: 700,
      dollarValue: 1650000,
      inStock: false,
    },
  ];

  describe('isLastInStock', () => {
    it('should return last car stock status', async function () {
      expect(isLastInStock(cars)).to.be.false;
    });
  });

  describe('averageDollarValue', () => {
    it('should return the cars average dollar value', () => {
      expect(averageDollarValue(cars)).to.equal(1775000);
    });
  });

  describe('fastestCar', () => {
    it('should retrieve the fastest car', () => {
      expect(fastestCar(cars)).to.equal('Aston Martin One-100 is the fastest');
    });
  });

  describe('totalPayout', () => {
    const data = [{ acc_1: 1 }, { acc_1: 2 }, { acc_2: 3 }];

    it('should return the accounts total payout', () => {
      expect(totalPayout(data)).to.deep.equal([{ acc_1: 3 }, { acc_2: 3 }]);
    });
  });
});
