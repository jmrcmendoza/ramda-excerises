import R from 'ramda';

const isLastInStock = R.compose(R.prop('inStock'), R.last);

const averageDollarValue = R.compose(
  R.converge(R.divide, [R.sum, R.length]),
  R.pluck('dollarValue'),
);

const fastestCar = R.compose(
  R.flip(R.concat)(' is fastest car'),
  R.prop('name'),
  R.last,
  R.sortBy(R.prop('horsepower')),
);

const totalPayout = R.compose(
  R.values,
  R.map(R.reduce(R.mergeWith(R.add), 0)),
  R.groupBy(R.keys),
);

module.exports = {
  isLastInStock,
  averageDollarValue,
  fastestCar,
  totalPayout,
};
