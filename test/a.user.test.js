import chai, { expect } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import createTables from './assets/seed';
import app from '../src/index';

dotenv.config();
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

before(createTables);
describe('User Should be able to signup', () => {
  it('should allow a user signup ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Samloco',
        lastname: 'Efe',
        password: '234576',
        confirmPassword: '234576',
        email: 'amadijustice@gmail.com',
        adminSecret: 'johnny',
        address: '70, 1korodu, lagos',
      })
      .end((err, res) => {

        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        expect(res.body.data).to.have.all.keys(['token', 'id', 'first_name', 'last_name', 'email', 'address']);
        done();
      });
  });

  it('should not allow an existing user to signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Chinonso',
        lastname: 'Amadi',
        email: 'amadi@gmail.com',
        password: 'biggie',
        confirmPassword: 'biggie',
        adminSecret: 'andela',
        address: '239, Epic towers, ikorodu road',
      })
      .end((err, res) => {
        
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal('User exist already');
        done();
      });
  });

  it('should not allow a user signup on empty firstname body', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: 'John',
        password: '123456hsfgsh',
        confirmPassword: '123456hsfgsh',
        email: 'amadijustice@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('firstname cannot be empty');
        done();
      });
  });

  it('should not allow a user signup on empty lastname body', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'juan',
        lastname: '',
        password: '123456hsfgsh',
        confirmPassword: '123456hsfgsh',
        email: 'amadijustice@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('lastname cannot be empty');
        done();
      });
  });

  console.log(process.env.NODE_ENV);
  it('should not allow a user signup on empty password  body', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Jerry',
        lastname: 'John',
        password: '',
        confirmPassword: '123456hsfgsh',
        email: 'amadijustice@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('password cannot be empty');
        done();
      });
  });

  it('should not allow a user signup on empty email body', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Charles',
        lastname: 'John',
        password: '123456hsfgsh',
        confirmPassword: '123456hsfgsh',
        email: '',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('email cannot be empty');
        done();
      });
  });

  it('should not allow a user signup with an invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Charles',
        lastname: 'John',
        password: '123456hsfgsh',
        confirmPassword: '123456hsfgsh',
        email: 'amadi.12@gmailcom',
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('invalid email');
        done();
      });
  });
  it('should not allow a user signup with a firstname less than two characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'C',
        lastname: 'John',
        password: '123456hsfgsh',
        confirmPassword: '123456hsfgsh',
        email: 'amadi@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('firstname must be atleast two characters long');
        done();
      });
  });
  it('should not allow a user signup with a lastname less than two characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Charles',
        lastname: 'J',
        password: '123456hsfgsh',
        confirmPassword: '123456hsfgsh',
        email: 'amadi@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('lastname must be atleast two characters long');
        done();
      });
  });
  it('should not allow a user signup with a password less than five characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Charles',
        lastname: 'Jude',
        password: '123',
        confirmPassword: '123',
        email: 'amadi@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('password must be greater than five characters');
        done();
      });
  });
});

describe('User should be able to signin', () => {
  it('should sign in a registered User', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'amadi@gmail.com',
        password: 'biggie',
      })
      .end((err, res) => {
        
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.all.keys(['id', 'first_name', 'last_name', 'email', 'token', 'is_admin']);
        done();
      });
  });

  it('should not allow an unregistered user signin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'jonbellion@human.com',
        password: 'nothinghaschanged',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('invalid credentials! No user exists!');
        done();
      });
  });

  it('should not signin a user on incorrect password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'amadi@gmail.com',
        password: 'iphone',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('incorrect password!');
        done();
      });
  });
});
