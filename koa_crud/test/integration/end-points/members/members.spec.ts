/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import R from 'ramda';

const chance = new Chance();

chai.use(chaiHttp);

describe('Member End-Points', () => {
  before(function () {
    this.request = () => chai.request(`http://localhost:3000`);
  });

  describe('Add vendor', () => {
    context('Given incorrect values', () => {
      it('should return error for empty username', async function () {
        const data = {
          username: null,
          password: chance.string({ length: 5 }),
          realName: chance.name(),
        };

        const response = await this.request()
          .post('/api/members')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal('Username must be provided.');
      });

      it('should return error for empty password', async function () {
        const data = {
          username: chance.last(),
          password: null,
          realName: chance.name(),
        };

        const response = await this.request()
          .post('/api/members')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal('Password must be provided.');
      });
    });

    context('Given correct values', () => {
      it('should insert new member', async function () {
        const data = {
          username: chance.last(),
          password: chance.string({ length: 5 }),
          realName: chance.name(),
        };
        const response = await this.request()
          .post('/api/members')
          .type('json')
          .send(data);

        expect(response.status).to.equal(201);
        expect(response.body).to.exist;
        expect(response.body).to.be.true;
      });
    });
  });
});
