/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import Chance from 'chance';
import R from 'ramda';
import server from '../../../../src';
import {
  getMembers,
  getOneMember,
  postMember,
} from '../../../../src/controllers/members';

const chance = new Chance();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Member Controller', () => {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('Create Member', () => {
    context('Given incorrect values', () => {
      it('should return 400 status code for empty username', async () => {
        const data = {
          body: {
            username: '',
            password: chance.string({ length: 5 }),
            realName: chance.name(),
          },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        const result = await postMember(data);

        expect(result).to.have.property('status', 400);
      });

      it('should return 400 status code for empty password', async () => {
        const data = {
          body: {
            username: chance.last(),
            password: '',
            realName: chance.name(),
          },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        const result = await postMember(data);

        expect(result).to.have.property('status', 400);
      });
    });

    context('Given correct values', () => {
      it('should insert member and return 200 status code', async () => {
        const data = {
          body: {
            username: chance.last(),
            password: chance.string({ length: 5 }),
            realName: chance.name(),
          },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        const result = await postMember(data);

        expect(result).to.have.property('status', 201);
        expect(result.body).to.be.true;
      });

      it('should return 400 status code for duplicate username', async () => {
        const members = await getMembers();

        const lastMember = R.last(members.body);

        const data = {
          body: {
            username: lastMember.username,
            password: chance.string({ length: 5 }),
            realName: chance.name(),
          },
          headers: {
            'Content-Type': null,
            Referer: null,
            'User-Agent': null,
          },
        };

        const result = await postMember(data);

        expect(result).to.have.property('status', 400);
      });
    });
  });

  describe('List Members', () => {
    it('should retrieve all members and return 200 status code', async () => {
      const result = await getMembers();

      expect(result).to.have.property('status', 200);
      expect(result.body).to.have.length.greaterThan(0);
    });

    it('should retrieve one member and return 200 status code', async () => {
      const members = await getMembers();

      const data = {
        params: { id: R.compose(R.prop('_id'), R.last)(members.body) },
        headers: {
          'Content-Type': null,
          Referer: null,
          'User-Agent': null,
        },
      };

      const result = await getOneMember(data);

      expect(result).to.have.property('status', 200);
      expect(result.body).to.be.an('object');
    });
  });
});
