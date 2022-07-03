const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const sinon = require('sinon');
const queries = require('../../db/queries/users');

const server = require('../../index');

const data = [
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

describe('routes : auth - stubbed', () => {
  describe('GET /users', () => {
    beforeEach(() => {
      sinon.stub(queries, 'getAllUsers').resolves(data);
    });

    afterEach(() => {
      queries.getAllUsers.restore();
    });

    it('should return json with all users', done => {
      chai
        .request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.length.should.eql(2);
          res.body.data[0].should.include.keys(
            'id',
            'name',
            'email',
            'password',
            'position',
            'is_admin',
            'created_at',
            'updated_at',
          );
          done();
        });
    });
  });

  describe('GET /users/:userId', () => {
    beforeEach(() => {
      sinon.stub(queries, 'getOneUser').resolves(data[0]);
    });

    afterEach(() => {
      queries.getOneUser.restore();
    });

    it('should return json with 1 user', done => {
      chai
        .request(server)
        .get('/api/v1/users/3')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.should.include.keys(
            'id',
            'name',
            'email',
            'password',
            'position',
            'is_admin',
            'created_at',
            'updated_at',
          );
          done();
        });
    }).timeout(5000);
  });

  describe('POST /users', () => {
    beforeEach(() => {
      this.query = sinon.stub(queries, 'createOne').resolves(data[0]);
    });

    afterEach(() => {
      this.query.restore();
    });

    it('should return json with 1 user', done => {
      chai
        .request(server)
        .post('/api/v1/users')
        .send({
          name: 'vamshree siramdasu',
          email: 'vamshree@outlook.com',
          password: 'siramdasu',
          position: 'Vice-President',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(201);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.should.include.keys(
            'id',
            'name',
            'email',
            'password',
            'position',
            'is_admin',
            'created_at',
            'updated_at',
          );
          done();
        });
    });
  });

  describe('PUT /users/:userId', () => {
    beforeEach(() => {
      this.query = sinon.stub(queries, 'updateOne').resolves(data[0]);
    });

    afterEach(() => {
      this.query.restore();
    });

    it('should return json with updated user', done => {
      chai
        .request(server)
        .put('/api/v1/users/3')
        .send(data[0])
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.should.include.keys(
            'id',
            'name',
            'email',
            'password',
            'position',
            'is_admin',
            'created_at',
            'updated_at',
          );
          done();
        });
    }).timeout(5000);
  });
});
