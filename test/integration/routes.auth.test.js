const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const query = require('../../db/queries/users');
const knex = require('../../db/connection');

const cryptutil = require('../../utils/bcrypt.util');
const server = require('../../index');

describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /users', () => {
    it('should return json', done => {
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
    it('should return json with 1 user', async () => {
      const { id } = await query.getFirstUserId();
      chai
        .request(server)
        .get(`/api/v1/users/${id}`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.length.should.eql(1);
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
        });
    }).timeout(5000);
  });

  describe('POST /users', () => {
    it('should create new user and return json', done => {
      chai
        .request(server)
        .post('/api/v1/users')
        .send({
          name: 'mocha test',
          email: 'mocha@test.com',
          password: cryptutil.hashPassword('mocha'),
          position: 'tester',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(201);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
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
          res.body.data[0].name.should.eql('mocha test');
          res.body.data[0].email.should.eql('mocha@test.com');
          cryptutil
            .comparePassword('mocha', res.body.data[0].password)
            .should.eql(true);
          done();
        });
    }).timeout(5000);
  });
});
