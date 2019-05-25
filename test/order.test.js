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

describe('Orders', () => {
  it('should make allow a user make a purchase order ', (done) => {
    chai.request(app)
      .post('api/v1/order')
      .set('authorization', myToken)
      .send({
        carId: 2,
        yourOffer: 4000000,
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.have.all.keys(['id', 'carId', 'createdOn','status', 'price','offer']);
        done();
      });
  });
});
