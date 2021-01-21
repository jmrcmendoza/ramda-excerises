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
          query: `{ members { 
            totalCount
            edges {
              node {
                id
                username
                realName
              }
              cursor            
            }
          } 
        }`,
        };

        const members = await this.request().post('/graphql').send(data);

        const lastMember = R.compose(
          R.prop('node'),
          R.last,
        )(members.body.data.members.edges);

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

  describe('List Members', () => {
    it('should return all members', async function () {
      const data = {
        query: `{ members { 
          totalCount
          edges {
            node {
              id
              username
              realName
            }
            cursor            
          }
        } 
      }`,
      };

      const response = await this.request().post('/graphql').send(data);

      expect(response.body.data).to.exist;
      expect(response.body.data.members.totalCount).to.be.greaterThan(0);
      expect(response.body.data.members.edges).to.be.an('array');
    });

    it('should return one member', async function () {
      let data = {
        query: `{ members { 
          totalCount
          edges {
            node {
              id
              username
              realName
            }
            cursor            
          }
        } 
      }`,
      };

      const members = await this.request().post('/graphql').send(data);

      const lastMemberId = R.compose(
        R.prop('id'),
        R.prop('node'),
        R.last,
      )(members.body.data.members.edges);

      data = {
        query: `{ member(id:"${lastMemberId}") { id username realName } }`,
      };

      const response = await this.request().post('/graphql').send(data);

      expect(response.body.data.member).to.exist;
      expect(response.body.data.member).to.be.an('object');
    });
  });

  describe('Edit Member', () => {
    context('Given incorrect values', () => {
      it('should throw error for empty username', async function () {
        let data = {
          query: `{ members { 
            totalCount
            edges {
              node {
                id
                username
                realName
              }
              cursor            
            }
          } 
        }`,
        };

        const members = await this.request().post('/graphql').send(data);

        const lastMemberId = R.compose(
          R.prop('id'),
          R.prop('node'),
          R.last,
        )(members.body.data.members.edges);

        data = {
          query: `mutation { updateMember(id:"${lastMemberId}", input:{ username:null, password:"${chance.string(
            { length: 5 },
          )}"}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });

      it('should throw error for null password', async function () {
        let data = {
          query: `{ members { 
            totalCount
            edges {
              node {
                id
                username
                realName
              }
              cursor            
            }
          } 
        }`,
        };

        const members = await this.request().post('/graphql').send(data);

        const lastMemberId = R.compose(
          R.prop('id'),
          R.prop('node'),
          R.last,
        )(members.body.data.members.edges);

        data = {
          query: `mutation { updateMember(id:"${lastMemberId}", input:{ username:"${chance.name()}", password:null }) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });
    });

    context('Given correct values', () => {
      it('should update member', async function () {
        let data = {
          query: `{ members { 
            totalCount
            edges {
              node {
                id
                username
                realName
              }
              cursor            
            }
          } 
        }`,
        };

        const members = await this.request().post('/graphql').send(data);

        const lastMember = R.compose(
          R.prop('node'),
          R.last,
        )(members.body.data.members.edges);

        data = {
          query: `mutation { updateMember(id:"${
            lastMember.id
          }", input:{ username:"${
            lastMember.username
          }", password:"${chance.string({ length: 5 })}"}) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body.data).to.have.property('updateMember', true);
      });

      it('should throw error for duplicate username', async function () {
        let data = {
          query: `mutation { createMember(input:{ username:"${chance.last()}", password:"${chance.string(
            { length: 5 },
          )}", realName:"${chance.name()}"}) }`,
        };

        await this.request().post('/graphql').send(data);

        data = {
          query: `{ members { 
            totalCount
            edges {
              node {
                id
                username
                realName
              }
              cursor            
            }
          } 
        }`,
        };

        const members = await this.request().post('/graphql').send(data);

        const firstMember = R.compose(
          R.prop('node'),
          R.head,
        )(members.body.data.members.edges);
        const lastMember = R.compose(
          R.prop('node'),
          R.last,
        )(members.body.data.members.edges);

        data = {
          query: `mutation { updateMember(id:"${
            lastMember.id
          }", input:{ username:"${
            firstMember.username
          }", password:"${chance.string({ lenght: 5 })}" }) }`,
        };

        const response = await this.request().post('/graphql').send(data);

        expect(response.body).to.have.property('errors');
      });
    });
  });

  describe('Delete Member', () => {
    it('should delete one member', async function () {
      let data = {
        query: `{ members { 
          totalCount
          edges {
            node {
              id
              username
              realName
            }
            cursor            
          }
        } 
      }`,
      };

      const members = await this.request().post('/graphql').send(data);

      const lastMemberId = R.compose(
        R.prop('id'),
        R.prop('node'),
        R.last,
      )(members.body.data.members.edges);

      data = {
        query: `mutation { deleteMember(id:"${lastMemberId}") }`,
      };

      const response = await this.request().post('/graphql').send(data);

      expect(response.body.data).to.have.property('deleteMember', true);
    });
  });
});
