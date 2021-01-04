type Car = {
  name: string;
  horsepower: number;
  dollarValue: number;
  inStock: boolean;
};

type IsLastInStock = (cars: Car[]) => boolean;
