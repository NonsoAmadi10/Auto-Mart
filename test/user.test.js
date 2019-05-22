import chai, { expect } from 'chai';

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

  it('should not allow a user signup on empty firstname input', (done) => {
    chai.request(app)
      .post('api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: 'Efe',
        password: 123456,
        email: 'amadijustice@gmail.com',
        is_admin: true,
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('firstname cannot be empty');
        done();
      });
  });
  it('should not allow a user signup on empty lastname input', (done) => {
   chai.request(app)
     .post('api/v1/auth/signup')
     .send({
       firstname: 'Sam loco',
       lastname: '',
       password: 123456,
       email: 'amadijustice@gmail.com',
     })
     .end((err, res) => {
       expect(res.status).to.equal(401);
       expect(res.body.error).to.equal('lasttname cannot be empty');
       done();
     });
 });
 it('should not allow a user signup on empty password input', (done) => {
  chai.request(app)
    .post('api/v1/auth/signup')
    .send({
      firstname: 'Sam loco',
      lastname: 'Efe',
      password: '',
      email: 'amadijustice@gmail.com',
    })
    .end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body.error).to.equal('password cannot be empty');
      done();
    });
});
it('should not allow a user signup on empty email input', (done) => {
 chai.request(app)
   .post('api/v1/auth/signup')
   .send({
     firstname: 'Sam loco',
     lastname: 'Efe',
     password: 123456,
     email: '',
   })
   .end((err, res) => {
     expect(res.status).to.equal(401);
     expect(res.body.error).to.equal('email cannot be empty');
     done();
   });
});
});
