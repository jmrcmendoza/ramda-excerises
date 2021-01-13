/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import Chance from 'chance';
import server from '../../../src';
import MemberModel from '../../../src/models/member';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Member Model', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Create Member', () => {
    context('Given incorrect values', () => {
      it('should throw an error for empty username', async () => {
        const data = {
          username: '',
          password: chance.string({ length: 5 }),
          realName: chance.name(),
        };

        await expect(MemberModel.create(data)).to.eventually.rejected;
      });

      it('should throw an error for empty password', async () => {
        const data = {
          username: chance.last(),
          password: '',
          realName: chance.name(),
        };

        await expect(MemberModel.create(data)).to.eventually.rejected;
      });
    });

    context('Given correct values', () => {
      it('should insert member', async () => {
        const data = {
          username: chance.last(),
          password: chance.string({ length: 5 }),
          realName: chance.name(),
        };

        const result = await MemberModel.create(data);

        expect(result).to.be.an('object');
        expect(result.username).to.equal(data.username);
      });

      it('should throw error for duplicate username', async () => {
        const member = await MemberModel.findOne({}).lean();

        const data = {
          username: member.username,
          password: chance.string({ length: 5 }),
          realName: chance.name(),
        };

        await expect(MemberModel.create(data)).to.eventually.rejected;
      });
    });
  });
});
