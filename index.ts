import R from 'ramda';

export const isLastInStock = R.compose(R.prop('inStock'), R.last);

export const averageDollarValue = R.compose(
  R.converge(R.divide, [R.sum, R.length]),
  R.pluck('dollarValue'),
);

export const fastestCar = R.compose(
  R.flip(R.concat)(' is the fastest'),
  R.prop('name'),
  R.last,
  R.sortBy(R.prop('horsepower')),
);

export const totalPayout = R.compose(
  R.values,
  R.map(R.reduce(R.mergeWith(R.add), 0)),
  R.groupBy(R.keys),
);
