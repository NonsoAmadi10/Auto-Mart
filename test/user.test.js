import chai, { expect } from  'chai';

import chaiHttp from 'chai-http';

import app from '../api/app';

chai.use(chaiHttp);

describe('User Should be able to signup', () => {
  it('should allow a user signup ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Sam loco',
        lastname: 'Efe',
        password: 123456,
        email: 'amadijustice@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        expect(res.body.data).to.have.all.keys(['token', 'id', 'firstname', 'lastname', 'email']);
        done();
      });
  });
});
