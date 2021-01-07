/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;

describe('Koa CRUD', () => {
  describe('Vendors', () => {
    describe('List vendors', () => {
      it('should return all vendors', async function () {
        await chai
          .request('http://localhost:3000')
          .get('/api/vendors')
          .then((res) => {
            expect(res.body.vendors).to.exist;
            expect(res.body.vendors)
              .to.be.an('array')
              .that.has.length.greaterThan(0);
          });
      });

      it('should return one vendor', async function () {
        const id = '5ff679a79de0a13d142d9fce';

        await chai
          .request('http://localhost:3000')
          .get(`/api/vendors/${id}`)
          .then((res) => {
            expect(res.body.vendor).to.exist;
          });
      });
    });
  });
});
