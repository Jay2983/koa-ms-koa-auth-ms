const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../index');

describe('routes : auth', () => {
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
