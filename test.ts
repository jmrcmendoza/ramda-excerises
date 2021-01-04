const R = require('ramda');

type Car = {
  name: string;
  horsepower: number;
  dollarValue: number;
  inStock: boolean;
};

type IsLastInStock = (cars: Car[]) => boolean;

const cars = [
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollarValue: 1850000,
    inStock: true,
  },
];

const isLastInStock = (cars) => {
  const lastCar = R.last(cars);
  return R.prop('inStock', lastCar);
};

console.log(isLastInStock(cars));
