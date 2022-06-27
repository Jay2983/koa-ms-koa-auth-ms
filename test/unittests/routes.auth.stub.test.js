const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const sinon = require('sinon');
const queries = require('../../db/queries/users');

const server = require('../../index');

describe('routes : auth - stubbed', () => {
  beforeEach(() => {
    const data = [
      {
        id: 3,
        name: 'vamshree admin',
        email: 'vamshree@bluesquaretech.com.au',
        password:
          '$2a$10$iO8lJ4x3ITk9lwmn8Db1wuu7jOjXhKUkJAeNmNibGMlucKMTC9pfC',
        position: 'Admin',
        is_admin: true,
        created_at: '2022-06-26T13:00:46.335Z',
        updated_at: '2022-06-26T13:00:46.335Z',
      },
      {
        id: 4,
        name: 'vamshree siramdasu',
        email: 'vamshree@outlook.com',
        password:
          '$2a$10$iO8lJ4x3ITk9lwmn8Db1wuu7jOjXhKUkJAeNmNibGMlucKMTC9pfC',
        position: 'Vice-President',
        is_admin: false,
        created_at: '2022-06-26T13:00:46.335Z',
        updated_at: '2022-06-26T13:00:46.335Z',
      },
    ];
    sinon.stub(queries, 'getAllUsers').resolves(data);
  });

  afterEach(() => {
    queries.getAllUsers.restore();
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
          console.log(res.body);
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
});
