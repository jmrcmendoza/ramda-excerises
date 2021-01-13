/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import Chance from 'chance';
import R from 'ramda';
import server from '../../../../src';
import memberDB from '../../../../src/data-access/members';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Member Data Access', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Create a Member', async () => {
    context('Given values are incorrect', () => {
      it('should throw a validation error for empty username', async () => {
        const data = {
          username: '',
          password: chance.string({ length: 5 }),
          realName: chance.name(),
        };

        await expect(memberDB.createMember(data)).to.eventually.rejected;
      });

      it('should throw a validation error for empty password', async () => {
        const data = {
          username: chance.last(),
          password: '',
          realName: chance.name(),
        };

        await expect(memberDB.createMember(data)).to.eventually.rejected;
      });
    });

    context('Given the values are correct', () => {
      it('should insert and return true', async () => {
        const data = {
          username: chance.last(),
          password: chance.string({ length: 5 }),
          realName: chance.name(),
        };

        const result = await memberDB.createMember(data);

        expect(result).to.be.true;
      });

      it('should throw error for duplicate username', async () => {
        const members = await memberDB.listMembers();

        const lastMember = R.last(members);

        const data = {
          username: lastMember.username,
          password: chance.string({ length: 5 }),
          realName: chance.name(),
        };

        await expect(memberDB.createMember(data)).to.eventually.rejected;
      });
    });
  });
});
