const R = require('ramda');

// const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
// const yellGreeting = R.compose(R.toUpper, classyGreeting);

// // console.log(yellGreeting('James', 'Bond'))



let cars = [ {
  name: 'Aston Martin One-77',
  horsepower: 750,
  dollarValue: 1850000,
  inStock: true,
}, {
  name: 'Aston Martin One-100',
  horsepower: 800,
  dollarValue: 1900000,
  inStock: false,
}]



//Last In Stock
const isLastInStock  = R.compose(R.prop('inStock'),R.last)(cars)









