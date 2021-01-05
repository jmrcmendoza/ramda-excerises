import R from 'ramda';

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
    inStock: false,
  },
];

const data = [{ acc_1: 1 }, { acc_1: 2 }, { acc_2: 3 }];

const isLastInStock = R.compose(R.prop('inStock'), R.last)(cars);

const averageDollarValue = R.compose(
  R.converge(R.divide, [R.sum, R.length]),
  R.pluck('dollarValue'),
)(cars);

const fastestCar = R.compose(
  R.flip(R.concat)(' is fastest car'),
  R.prop('name'),
  R.last,
  R.sortBy(R.prop('horsepower')),
)(cars);

const totalPayout = R.compose(
  R.values,
  R.map(R.reduce(R.mergeWith(R.add), 0)),
  R.groupBy(R.keys),
)(data);

module.exports = {
  isLastInStock,
  averageDollarValue,
  fastestCar,
  totalPayout,
};
