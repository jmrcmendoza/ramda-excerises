/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Chance from 'chance';
import R from 'ramda';
// import chai, { expect } from 'chai';
import { fromCursorHash, paginate, toCursorHash } from '@helpers/pagination';

const chance = new Chance();

describe('Pagination', () => {
  it('should return false on next page given limit value is equal to data length ', () => {
    const data = [
      { name: chance.word(), createdAt: chance.date() },
      { name: chance.word(), createdAt: chance.date() },
      { name: chance.word(), createdAt: chance.date() },
    ];

    const result = paginate(R.length(data), data);

    expect(result).to.have.property('totalCount', R.length(data));
    expect(result).to.have.property('pageInfo');
    expect(result).to.have.property('edges');
    expect(result.pageInfo.hasNextPage).to.be.false;
  });

  it('should return false on next page given limit value is less than data length ', () => {
    const data = [
      { name: chance.word(), createdAt: chance.date() },
      { name: chance.word(), createdAt: chance.date() },
      { name: chance.word(), createdAt: chance.date() },
    ];

    const result = paginate(R.length(data) - 1, data);

    expect(result).to.have.property('totalCount', R.length(data) - 1);
    expect(result).to.have.property('pageInfo');
    expect(result).to.have.property('edges');
    expect(result.pageInfo.hasNextPage).to.be.true;
  });

  it('should thrown error for missing createdAt field', () => {
    const data = [
      { name: chance.word(), createdAt: chance.date() },
      { name: chance.word(), createdAt: chance.date() },
      { name: chance.word() },
    ];

    expect(() => paginate(R.length(data), data))
      .to.throw('Created At field is missing.')
      .to.have.property('name', 'PAGINATE_VALIDATION_ERROR');
  });
});

describe('toCursorHash', () => {
  it('should return Buffer string', () => {
    const result = toCursorHash(chance.date());

    expect(typeof result).to.equal('string');
  });

  it('should throw an error for invalid data', () => {
    expect(() => toCursorHash(chance.natural()))
      .to.be.throw()
      .and.have.property('name', 'TypeError');
  });
});

describe('fromCursorHash', () => {
  it('should return date equal to the data', () => {
    const data = chance.date();

    const cursorHash = toCursorHash(data);

    const result = fromCursorHash(cursorHash);

    expect(typeof result).to.equal('string');
    expect(new Date(result).toDateString()).to.equal(data.toDateString());
  });

  it('should throw an error for invalid data', () => {
    expect(() => fromCursorHash(chance.natural()))
      .to.be.throw()
      .and.have.property('name', 'TypeError');
  });
});
