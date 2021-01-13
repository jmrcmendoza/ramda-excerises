/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import Chance from 'chance';
import server from '../../../../src';
import { insertMember, listMembers } from '../../../../src/use-cases/members';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Member Use Case', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Add Member', () => {
    context('Given incorrect values', () => {
      it('should throw an error for empty username', async () => {
        const data = {
          username: '',
          password: chance.string({ lenght: 5 }),
          realName: chance.name(),
        };

        await expect(insertMember(data)).to.eventually.rejectedWith(
          'Username must be provided.',
        );
      });

      it('should throw an error for empty password', async () => {
        const data = {
          username: chance.last(),
          password: '',
          realName: chance.name(),
        };

        await expect(insertMember(data)).to.eventually.rejectedWith(
          'Password must be provided.',
        );
      });
    });

    context('Given correct values', () => {
      it('should insert member and return true', async () => {
        const data = {
          username: chance.last(),
          password: chance.string({ lenght: 5 }),
          realName: chance.name(),
        };

        const result = await insertMember(data);

        expect(result).to.exist;
        expect(result).to.be.true;
      });

      it('should throw error for duplicate username', async () => {
        const members = await listMembers();

        const lastMember = R.last(members);

        const data = {
          username: lastMember.username,
          password: chance.string({ lenght: 5 }),
          realName: chance.name(),
        };

        await expect(insertMember(data)).to.eventually.rejected;
      });
    });
  });
});
