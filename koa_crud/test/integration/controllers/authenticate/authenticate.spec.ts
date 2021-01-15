/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import Chance from 'chance';
import R from 'ramda';
import server from '../../../../src';

import { authMember } from '../../../../src/controllers/authenticate';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Authenticate Controller', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Authenticate Member', () => {
    context('Given incorrect values', () => {
      it('should return 400 status code for empty username', async () => {
        const data = {
          body: {
            username: '',
            password: chance.string({ length: 5 }),
          },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        const result = await authMember(data);

        expect(result).to.have.property('status', 400);
      });

      it('should return 400 status code for empty password', async () => {
        const data = {
          body: {
            username: chance.last(),
            password: '',
          },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        const result = await authMember(data);

        expect(result).to.have.property('status', 400);
      });
    });

    context('Given correct values', () => {
      it('should return 400 status code for invalid password', async () => {
        const data = {
          body: {
            username: 'Jason',
            password: 'test',
          },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        const result = await authMember(data);

        expect(result).to.have.property('status', 400);
        expect(result.body).to.have.property(
          'errorMsg',
          'Authenticate failed.',
        );
      });

      it('should return token and 200 status code ', async () => {
        const data = {
          body: {
            username: 'Jason',
            password: '1234',
          },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        const result = await authMember(data);

        expect(result).to.have.property('status', 201);
        expect(result.body).to.have.property('token');
      });
    });
  });
});
