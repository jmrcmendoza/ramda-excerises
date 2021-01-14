import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Chance from 'chance';
import { makeMember } from '../../../../src/entities/members';

const chance = new Chance();

chai.use(chaiAsPromised);

describe('Entities - Members', () => {
  it('should throw an error for null vendor name', async () => {
    const data = {
      username: '',
      password: chance.string({ length: 5 }),
    };

    await expect(makeMember(data)).to.eventually.rejectedWith(
      'Username must be provided.',
    );
  });

  it('should throw an error for null vendor type', async () => {
    const data = {
      username: chance.name(),
      password: '',
    };

    await expect(makeMember(data)).to.eventually.rejectedWith(
      'Password must be provided.',
    );
  });

  it('should return undefined', async () => {
    const data = {
      username: chance.name(),
      password: chance.string({ length: 5 }),
    };

    await expect(makeMember(data)).to.eventually.be.fulfilled;
  });
});
