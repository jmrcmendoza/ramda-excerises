/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';

import Chance from 'chance';
import server from '../../../../src';
import { authenticateMember } from '../../../../src/use-cases/authenticate';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Member Use Case', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Authenticate Member', () => {
    context('Given incorrect values', () => {
      it('should throw an error for empty username', async () => {
        const data = {
          username: '',
          password: chance.string({ lenght: 5 }),
        };

        await expect(authenticateMember(data)).to.eventually.rejectedWith(
          'Username must be provided.',
        );
      });

      it('should throw an error for empty password', async () => {
        const data = {
          username: chance.last(),
          password: '',
        };

        await expect(authenticateMember(data)).to.eventually.rejectedWith(
          'Password must be provided.',
        );
      });
    });

    context('Given correct values', () => {
      it('should throw an error for invalid password', async () => {
        const data = {
          username: 'Jason',
          password: chance.string({ lenght: 5 }),
        };

        await expect(authenticateMember(data)).to.eventually.rejectedWith(
          'Authenticate failed.',
        );
      });

      it('should return token', async () => {
        const data = {
          username: 'Jason',
          password: '1234',
        };

        const result = await authenticateMember(data);

        expect(result).to.have.property('token');
      });
    });
  });
});
