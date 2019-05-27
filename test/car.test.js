import  chai from 'chai';
import { expect } from 'chai';


import fs from 'fs';
import chaihttp from 'chai-http';
import app from '../src/index';

chai.use(chaihttp);


let myToken;
let adminToken;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'amadi@gmail.com',
      password: '1234567',
    })
    .end((err, res) => {
      if (err) done(err);
      myToken = res.body.data.token;
      done();
    });
});

describe('Cars', () => {

  it('should post a car advert', (done) => {
    const filePath = `${__dirname}/assets/asphalt-automobiles-automotive-757181.jpg`;
    chai.request(app)
      .post('/api/v1/car')
      .set('authorization', myToken)
      .type('form')
      .set('enctype', 'multipart/formdata')
      .attach('photo', fs.readFileSync(filePath), 'asphalt-automobiles-automotive-757181.jpg')
      .field('state', 'used')
      .field('price', 3500000)
      .field('manufacturer', 'volkswagen')
      .field('model', 'corolla')
      .field('bodyType', 'sedan')
      .field('status', 'available')
      .end((err, res) => {

        expect(res).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.data).to.have.all.keys(['id', 'email', 'manufacturer', 'model', 'price', 'bodyType', 'status', 'state', 'createdOn', 'imageUrl']);
        done();
      });
  });

  it('should not accept an invalid image', (done) => {
    const filePath = `${__dirname}/assets/meeting.ics`;
    chai.request(app)
      .post('/api/v1/car')
      .set('authorization', myToken)
      .type('form')
      .set('enctype', 'multipart/formdata')
      .attach('photo', fs.readFileSync(filePath), 'asphalt-automobiles-automotive-757181.ics')
      .field('state', 'used')
      .field('price', 3500000)
      .field('manufacturer', 'volkswagen')
      .field('model', 'corolla')
      .field('bodyType', 'sedan')
      .field('status', 'available')
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Only image files are allowed');
        done();
      });
  });

  it('should update the status of a Car sale advert', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1/status')
      .set('Authorization', myToken)
      .send({
        status: 'sold',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.status).to.equal('sold');
        done();
      });
  });

  it('should not update the status of an advert if it does not belong to a user', (done) => {
    chai.request(app)
      .patch('/api/v1/car/3/status')
      .set('Authorization', myToken)
      .send({
        status: 'sold',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Car not found');
        done();
      });
  });
  it('should only the status of a sold car', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1/status')
      .set('Authorization', myToken)
      .send({
        status: 'hello',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('You Can only update a sold car');
        done();
      });
  });

  it('should not update the price of an advert if it does not belong to a user', (done) => {
    chai.request(app)
      .patch('/api/v1/car/3/price')
      .set('Authorization', myToken)
      .send({
        price: 12345,
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Car not found');
        done();
      });
  });
  it('should update the price of an advert if it d belongs to a user', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1/price')
      .set('Authorization', myToken)
      .send({
        price: 123456,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.price).to.equal(123456);
        done();
      });
  });
  it('should not update the price of an advert if the request body is not a number', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1/price')
      .set('Authorization', myToken)
      .send({
        price: 'sold',
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Enter a valid price number');
        done();
      });
  });
});
