/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';

const chance = new Chance();

chai.use(chaiHttp);

describe('Authenticate End-Point', () => {
  before(function () {
    this.request = () => chai.request(`http://localhost:3000`);
  });

  describe('Authenticate Member', () => {
    context('Given incorrect values', () => {
      it('should return error for empty username', async function () {
        const data = {
          username: null,
          password: chance.string({ length: 5 }),
        };

        const response = await this.request()
          .post('/api/authenticate')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal('Username must be provided.');
      });

      it('should return error for empty password', async function () {
        const data = {
          username: chance.last(),
          password: null,
        };

        const response = await this.request()
          .post('/api/authenticate')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.errorMsg).to.equal('Password must be provided.');
      });
    });

    context('Given correct values', () => {
      it('should throw an error for invalid password', async function () {
        const data = {
          username: 'Jason',
          password: chance.string({ length: 5 }),
        };
        const response = await this.request()
          .post('/api/authenticate')
          .type('json')
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property(
          'errorMsg',
          'Authenticate failed.',
        );
      });

      it('should return token', async function () {
        const data = {
          username: 'Jason',
          password: '1234',
        };
        const response = await this.request()
          .post('/api/authenticate')
          .type('json')
          .send(data);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('token');
      });
    });
  });
});
