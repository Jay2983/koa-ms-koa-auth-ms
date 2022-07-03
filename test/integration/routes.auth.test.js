const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../index');
const knex = require('../../db/connection');

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
    name: 'vamshree reg admin',
    email: 'vamshree.regadmin@bluesquaretech.com.au',
    password: 'siramdasu',
    position: 'Admin',
    is_admin: true,
  },
  {
    name: 'vamshree siramdasu',
    email: 'vamshree.reguser@outlook.com',
    password: 'siramdasu',
    position: 'Vice-President',
  },
];

describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  it('should register the user', done => {
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

  it('should login the user', done => {
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
