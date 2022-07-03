const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const passport = require('koa-passport');
const sinon = require('sinon');
const queries = require('../../db/queries/users');

const server = require('../../index');

const userdata = [
  {
    id: 3,
    name: 'vamshree admin',
    email: 'vamshree@bluesquaretech.com.au',
    password: '$2a$10$iO8lJ4x3ITk9lwmn8Db1wuu7jOjXhKUkJAeNmNibGMlucKMTC9pfC',
    position: 'Admin',
    is_admin: true,
    created_at: '2022-06-26T13:00:46.335Z',
    updated_at: '2022-06-26T13:00:46.335Z',
  },
  {
    id: 4,
    name: 'vamshree siramdasu',
    email: 'vamshree@outlook.com',
    password: '$2a$10$iO8lJ4x3ITk9lwmn8Db1wuu7jOjXhKUkJAeNmNibGMlucKMTC9pfC',
    position: 'Vice-President',
    is_admin: false,
    created_at: '2022-06-26T13:00:46.335Z',
    updated_at: '2022-06-26T13:00:46.335Z',
  },
];

const regData = [
  {
    name: 'vamshree admin',
    email: 'vamshree@bluesquaretech.com.au',
    password: '$2a$10$iO8lJ4x3ITk9lwmn8Db1wuu7jOjXhKUkJAeNmNibGMlucKMTC9pfC',
    position: 'Admin',
    is_admin: true,
  },
  {
    name: 'vamshree siramdasu',
    email: 'vamshree@outlook.com',
    password: '$2a$10$iO8lJ4x3ITk9lwmn8Db1wuu7jOjXhKUkJAeNmNibGMlucKMTC9pfC',
    position: 'Vice-President',
  },
];

describe('routes : auth with stub', () => {
  beforeEach(() => {
    this.authenticate = sinon.stub(passport, 'authenticate').returns(() => {});
    this.register = sinon.stub(queries, 'createOne').returns(() => {});
  });

  afterEach(() => {
    this.authenticate.restore();
    this.register.restore();
  });

  describe('POST /api/auth/register', () => {
    it('should register the user', done => {
      this.register.returns(Promise.resolve(userdata[0]));
      chai
        .request(server)
        .post('/api/v1/auth/register')
        .send(regData[0])
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(201);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });
  });

  describe('routes : POST /auth/login - stub', () => {
    beforeEach(() => {
      this.authenticate.yields(null, { id: 1 });
    });

    it('should login a user', done => {
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send({ email: userdata[0].email, password: 'siramdasu' })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });
  });
});
