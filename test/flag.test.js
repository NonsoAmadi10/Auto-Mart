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

describe('Flags', () => {
  it('should report an advert as fraudulent', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', myToken)
      .send({
        carId: 1,
        reason: 'abnormal demands',
        description: 'The seller requested for 450000 naira for a vehicle in bad shape',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.all.keys(['id, carId, reason, description']);
        done();
      });
  });

  it('should not accept allow a report to be sent if the user is not logged in', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .send({
        carId: 1,
        reason: 'abnormal price',
        description: 'Lorem ipsum',
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('You must be logged in to use this route');
        done();
      });
  });
  it('should return a 404 if car does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', myToken)
      .send({
        carId: 700000000,
        reason: 'faulty engine',
        description: 'Lorem ipsum',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Car not found');
        done();
      });
  });

  it('should not post a flag if the car id is not specified', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', myToken)
      .send({
        reason: 'abnormal demand',
        description: 'Lorem ipsum',
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Car id was not specified');
        done();
      });
  });
  it('should not post a flag if the car reason is not specified', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', myToken)
      .send({
        carId: 2,
        description: 'Lorem ipsum',
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('your reason was not specified');
        done();
      });
  });
  it('should not post a flag if the car id is not specified', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', myToken)
      .send({
        reason: 'abnormal demand',
        description: 'Lorem ipsum',
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Car id was not specified');
        done();
      });
  });
  it('should not post a flag if the description is not specified', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', myToken)
      .send({
        reason: 'abnormal demand',
        carId: 3,
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Your report description was not specified');
        done();
      });
  });
  it('should not post a flag if the car id is not an integer', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', myToken)
      .send({
        carId: 'sayGoodbye',
        reason: 'abnormal demand',
        description: 'Lorem ipsum',
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Car id must be an integer');
        done();
      });
  });

  it('should not post a flag if the reason is an integer', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', myToken)
      .send({
        carId: 2,
        reason: 419,
        description: 'Lorem ipsum',
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Reason cannot be an integer');
        done();
      });
  });

  it('should not post a flag if the description is an integer', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', myToken)
      .send({
        carId: 2,
        reason: 'abnormal demand',
        description: 1998,
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Description is not an integer');
        done();
      });
  });
});
