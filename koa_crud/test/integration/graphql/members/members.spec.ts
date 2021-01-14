/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import R from 'ramda';

const chance = new Chance();

chai.use(chaiHttp);

describe('Members', function () {
  before(function () {
    this.request = () => chai.request('http://localhost:3000');
  });

  describe('Add member', () => {
    context('Given incorrect values', () => {
      it('should return error for empty username', async function () {
        const data = {
          query: `mutation { createMember(input:{ username:"", password:"${chance.string(
            { length: 5 },
          )}"}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });

      it('should return error for empty passowrd', async function () {
        const data = {
          query: `mutation { createMember(input:{ username:"${chance.last()}", password:""}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });
    });

    context('Given correct values', () => {
      it('should insert member', async function () {
        const data = {
          query: `mutation { createMember(input:{ username:"${chance.last()}", password:"${chance.string(
            { length: 5 },
          )}", realName:"${chance.name()}"}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response).to.have.property('status', 200);
        expect(response.body.data.createMember).to.be.true;
      });

      it('should throw error for duplicate username', async function () {
        let data = {
          query: `{ members { _id username realName } }`,
        };

        const members = await this.request().post('/graphql').send(data);

        const lastMember = R.last(members.body.data.members);

        data = {
          query: `mutation { createMember(input:{ username:"${
            lastMember.username
          }", password:"${chance.string({
            length: 5,
          })}", realName:"${chance.name()}"}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });
    });
  });
});
