import chai from 'chai';

import fs from 'fs';
import chaihttp from 'chai-http';
import app from '../src/index';
import createTables from './assets/seed';
import { users, generateValidToken } from './assets/usersedd';

const { expect } = chai;

chai.use(chaihttp);


let myToken;
let adminToken;

before((done) => {

  createTables();
  done();
});


describe('Cars', () => {
  const { admin, validUser } = users;
  myToken = generateValidToken(validUser)
  adminToken = generateValidToken(admin);
  
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
        expect(res.body.data).to.have.all.keys(['id', 'owneremail','ownerid', 'manufacturer', 'model', 'price', 'body_type', 'status', 'state', 'createdon', 'image_url', 'flagged']);
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
      .patch('/api/v1/car/2/status')
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
      .patch('/api/v1/car/700/status')
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
  it('should only update the status of a sold car', (done) => {
    chai.request(app)
      .patch('/api/v1/car/2/status')
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
      .patch('/api/v1/car/3000/price')
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
      .patch('/api/v1/car/2/price')
      .set('Authorization', myToken)
      .send({
        price: 123456.00,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.price).to.equal(Number(123456).toFixed(2));
        done();
      });
  });
  it('should not update the price of an advert if the request body is not a number', (done) => {
    chai.request(app)
      .patch('/api/v1/car/2/price')
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

  it('should  get an advert on valid params id', (done) => {
    chai.request(app)
      .get('/api/v1/car/2')
      .set('Authorization', myToken)
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });

  });


  it('should not get an advert on invalid params id', (done) => {
    chai.request(app)
      .get('/api/v1/car/b')
      .set('Authorization', myToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Invalid URL parameter');
        done();
      });
  });

  it('should get all unsold cars', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .query({ status: 'available' })
      .set('Authorization', myToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0].status).to.equal('available');
        done();
      });

  });

  

  it('should get all unsold cars within a specified price range', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', myToken)
      .query({ status: 'available', min_price: 0, max_price: 200000.089 })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('should return a 404 if there was no car found within the price range', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', myToken)
      .query({ status: 'available', min_price: 10000000000000, max_price: 2000000000000000 })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('No match found');
        done();
      });
  });

  it('should return a 422 if the minimum price is not a number', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', myToken)
      .query({ status: 'available', min_price: 'chimdi', max_price: 20000000 })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('min_price entered is not a valid entry');
        done();
      });
  });


  it('should return a 422 if the maximum price is not a number', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', myToken)
      .query({ status: 'available', min_price: 4000000, max_price: 'charlies' })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('max_price entered is not a valid entry');
        done();
      });
  });
/*
  it('should get all cars', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });

  });

  it('should not allow a user who is not an admin access this route', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', myToken)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.error).to.equal('only admins can access this route');
        done();

      });
  });

  it('should delete a car advert', (done) => {
    chai.request(app)
      .delete('/api/v1/car/7')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.equal('Car Ad was successfully deleted');
        done();
      });
  });

  it('should not allow a user who is not admin delete a car advert', (done) => {
    chai.request(app)
      .delete('/api/v1/car/7')
      .set('Authorization', myToken)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.error).to.equal('you are not authorized to do this');
        done();
      });
  });

  it('should send a 404 if the id is not available', (done) => {
    chai.request(app)
      .delete('/api/v1/car/5000')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Advert not found');
        done();
      });
  });

  it('should throw an error on invalid params', (done) => {
    chai.request(app)
      .delete('/api/v1/car/g')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Invalid URL parameter');
        done();
      });
  });
  */
});
