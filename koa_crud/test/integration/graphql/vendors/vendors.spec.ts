/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import R from 'ramda';
import MemberModel from '../../../../src/models/member';
import { createHash } from '../../../../src/encryption';
import { VendorType } from '../../../../src/models/vendor';
import server from '../../../../src';

const chance = new Chance();

chai.use(chaiHttp);

describe('Vendors', function () {
  before(async function () {
    this.request = () => chai.request(server);

    const password = '1234';

    const memberData = {
      username: chance.word(),
      password: await createHash(password),
    };

    await MemberModel.create(memberData);

    this.getToken = async () => {
      const data = {
        query: `mutation { authenticate(
          input: { 
            username: "${memberData.username}",
            password: "${password}"
          }){ 
            token 
          }
        }`,
      };

      const result = await this.request().post('/graphql').send(data);

      return result.body.data.authenticate.token;
    };
  });

  describe('Add vendor', () => {
    context('Given incorrect values', () => {
      it('should return error for null vendor name', async function () {
        const token = await this.getToken();

        const data = {
          query: `mutation { createVendor(input:{ name:null, type:${VendorType.Seamless}}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.body).to.have.property('errors');
      });

      it('should return error for null vendor type', async function () {
        const token = await this.getToken();

        const data = {
          query: `mutation { createVendor(input:{ name:${chance.name()}, type:null}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.body).to.have.property('errors');
      });
    });

    context('Given correct values', () => {
      it('should insert vendor', async function () {
        const token = await this.getToken();
        const data = {
          query: `mutation { createVendor(input:{ name:"${chance.name()}", type:${
            VendorType.Seamless
          }}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response).to.have.property('status', 200);
        expect(response.body.data.createVendor).to.be.true;
      });
    });

    context('Given invalid token', () => {
      it('should throw an error for forbidden', async function () {
        const data = {
          query: `mutation { createVendor(input:{ name:"${chance.name()}", type:${
            VendorType.Seamless
          }}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .set('authorization', 'Bearer token')
          .send(data);

        expect(response.body).to.have.property('errors');
      });
    });
  });

  describe('List Vendors', () => {
    context('Given valid token', () => {
      it('should return all vendors', async function () {
        const token = await this.getToken();

        const data = {
          query: `{ vendors { 
            totalCount
            edges {
              node {
                id 
                name 
                type                
              }
            } 
          } 
        }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.body.data).to.exist;
        expect(response.body.data.vendors.totalCount).to.be.greaterThan(0);
        expect(response.body.data.vendors.edges).to.be.an('array');
      });

      it('should return one vendor', async function () {
        const token = await this.getToken();

        let data = {
          query: `{ vendors { 
            totalCount
            edges {
              node {
                id 
                name 
                type                
              }
            } 
          } 
        }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendorId = R.compose(
          R.prop('id'),
          R.prop('node'),
          R.last,
        )(vendors.body.data.vendors.edges);

        data = {
          query: `{ vendor(id:"${lastVendorId}") { id name type } }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.body.data.vendor).to.exist;
        expect(response.body.data.vendor).to.be.an('object');
      });
    });

    context('Given invalid token', () => {
      it('should throw an error for invalid token', async function () {
        let data = {
          query: `{ vendors { 
            totalCount
            edges {
              node {
                id 
                name 
                type                
              }
            } 
          } 
        }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendorId = R.compose(
          R.prop('id'),
          R.prop('node'),
          R.last,
        )(vendors.body.data.vendors.edges);

        data = {
          query: `{ vendor(id:"${lastVendorId}") { id name type } }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer token`);

        expect(response.body).to.have.property('errors');
      });
    });
  });

  describe('Edit Vendor', () => {
    context('Given incorrect values', () => {
      it('should throw error for null name', async function () {
        const token = await this.getToken();

        let data = {
          query: `{ vendors { 
            totalCount
            edges {
              node {
                id 
                name 
                type                
              }
            } 
          } 
        }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendorId = R.compose(
          R.prop('id'),
          R.prop('node'),
          R.last,
        )(vendors.body.data.vendors.edges);

        data = {
          query: `mutation { updateVendor(id:"${lastVendorId}", input:{ name:null, type:${VendorType.Seamless}}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.body).to.have.property('errors');
      });

      it('should throw error for null type', async function () {
        const token = await this.getToken();

        let data = {
          query: `{ vendors { 
            totalCount
            edges {
              node {
                id 
                name 
                type                
              }
            } 
          } 
        }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendorId = R.compose(
          R.prop('id'),
          R.prop('node'),
          R.last,
        )(vendors.body.data.vendors.edges);

        data = {
          query: `mutation { updateVendor(id:"${lastVendorId}", input:{ name:"${chance.name()}", type:null }) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.body).to.have.property('errors');
      });

      it('should throw error for invalid type', async function () {
        const token = await this.getToken();
        let data = {
          query: `{ vendors { 
            totalCount
            edges {
              node {
                id 
                name 
                type                
              }
            } 
          } 
        }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendorId = R.compose(
          R.prop('id'),
          R.prop('node'),
          R.last,
        )(vendors.body.data.vendors.edges);

        data = {
          query: `mutation { updateVendor(id:"${lastVendorId}", input:{ name:"${chance.name()}", type:"TEST" }) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.body).to.have.property('errors');
      });
    });

    context('Given correct values', () => {
      it('should update vendor', async function () {
        const token = await this.getToken();

        let data = {
          query: `{ vendors { 
            totalCount
            edges {
              node {
                id 
                name 
                type                
              }
            } 
          } 
        }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendor = R.compose(
          R.prop('node'),
          R.last,
        )(vendors.body.data.vendors.edges);

        data = {
          query: `mutation { updateVendor(id:"${lastVendor.id}", input:{ name:"${lastVendor.name}", type:${VendorType.Transfer}}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.property('updateVendor', true);
      });
    });

    context('Given invalid token', () => {
      it('should thrown an error for invalid token', async function () {
        let data = {
          query: `{ vendors { 
            totalCount
            edges {
              node {
                id 
                name 
                type                
              }
            } 
          } 
        }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendor = R.compose(
          R.prop('node'),
          R.last,
        )(vendors.body.data.vendors.edges);

        data = {
          query: `mutation { updateVendor(id:"${lastVendor.id}", input:{ name:"${lastVendor.name}", type:${VendorType.Transfer}}) }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer token`);

        expect(response.body).to.have.property('errors');
      });
    });
  });

  describe('Delete Vendor', () => {
    context('Given valid token', () => {
      it('should delete one vendor', async function () {
        const token = await this.getToken();

        let data = {
          query: `{ vendors { 
            totalCount
            edges {
              node {
                id 
                name 
                type                
              }
            } 
          } 
        }`,
        };

        const vendors = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        const lastVendorId = R.compose(
          R.prop('id'),
          R.prop('node'),
          R.last,
        )(vendors.body.data.vendors.edges);

        data = {
          query: `mutation { deleteVendor(id:"${lastVendorId}") }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer ${token}`);

        expect(response.body.data).to.have.property('deleteVendor', true);
      });
    });

    context('Given invalid token', () => {
      it('should throw an error for invalid token', async function () {
        let data = {
          query: `{ vendors { 
            totalCount
            edges {
              node {
                id 
                name 
                type                
              }
            } 
          } 
        }`,
        };

        const vendors = await this.request().post('/graphql').send(data);

        const lastVendorId = R.compose(
          R.prop('id'),
          R.prop('node'),
          R.last,
        )(vendors.body.data.vendors.edges);

        data = {
          query: `mutation { deleteVendor(id:"${lastVendorId}") }`,
        };

        const response = await this.request()
          .post('/graphql')
          .send(data)
          .set('authorization', `Bearer token`);

        expect(response.body).to.have.property('errors');
      });
    });
  });
});
