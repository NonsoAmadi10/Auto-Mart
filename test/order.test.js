import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../src/index';

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
        carId: 7,
        offer: '3000000',
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
  })

});
