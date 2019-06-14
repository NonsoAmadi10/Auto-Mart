import chai from 'chai';
import chaihttp from 'chai-http';
//import app from '../src/index';

const { expect } = chai;

chai.use(chaihttp);

let myToken;


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

describe('Orders', () => {
  it('should send a 201 status to post an order', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', myToken)
      .send({
        carId: 2,
        offer: 3000000,
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an('object');
        expect(res).to.have.status(201);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.status).to.deep.equal('success');
        expect(res.body.data).to.have.keys('id', 'carId', 'status', 'price', 'offer', 'buyerId', 'createdOn');
        done();
      });
  });
  it('should not purchase a Car if it does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', myToken)
      .send({
        carId: 70,
        offer: 3000000,
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an('object');
        expect(res).to.have.status(404);
  
        expect(res.body.error).to.equal('Car does not exist');
        done();
      });
  });
  
  it('should not purchase a Car if the offer is not a number', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', myToken)
      .send({
        carId: 3,
        offer: '334ssddfrdf',
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an('object');
        expect(res).to.have.status(422);
        expect(res.body.error).to.equal('Please enter a valid offer');
        done();
      });
  });
  
  it('should not accept empty input bodies',(done) =>{
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization',myToken)
      .send({
        carId: '',
        offer: '',
      })
      .end((error, res) => {
        if(error) done(error);
        expect(res.status).to.equal(422);
        done();
      })
  });
  
  it('should update the price of a User"s purchase order', (done) => {
    chai.request(app)
      .patch('/api/v1/order/2/price')
      .set('Authorization', myToken)
      .send({
        newOffer: 7000000
      })
      .end((error, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.all.keys(['id', 'createdOn', 'buyerId','carId','oldOffer','price','newOffer','status']);
        done();
      })
  });
  it('should not update the offer of a purchase order that does not belong to user', (done) => {
    chai.request(app)
      .patch('/api/v1/order/6/price')
      .set('Authorization', myToken)
      .send({
        newOffer: 7000000
      })
      .end((error, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Order not found');
        done();
      })
  });
  it('should not update the offer of a purchase order that has an empty input field', (done) => {
    chai.request(app)
      .patch('/api/v1/order/2/price')
      .set('Authorization', myToken)
      .send({
        newOffer: ''
      })
      .end((error, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Please enter a new Offer');
        done();
      })
  });
  it('should not update the offer of a purchase order if the offer is not a number', (done) => {
    chai.request(app)
      .patch('/api/v1/order/2/price')
      .set('Authorization', myToken)
      .send({
        newOffer: '70oose7'
      })
      .end((error, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Please enter a valid Offer');
        done();
      })
  });
  it('should not accept an invalid URL', (done) => {
    chai.request(app)
      .patch('/api/v1/order/a/price')
      .set('Authorization', myToken)
      .send({
        newOffer: 7000000
      })
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Invalid Request');
        done();
      })
  });
  
})
