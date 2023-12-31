const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('./auth'); // Import the Express app

const expect = chai.expect;
chai.use(chaiHttp);

describe('Authentication Service', () => {
  let testsCompleted = 0; // Counter for completed tests

  it('should authenticate a valid email domain', (done) => {
    chai
      .request(app)
      .post('/auth')
      .send({ email: 'test@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.authenticated).to.be.true;
        testsCompleted++; // Increment completed tests count
        if (testsCompleted === 2) {
          // If all tests are completed, exit Mocha
          done();
          process.exit(0); // Exit Mocha
        } else {
          done();
        }
      });
  });

  it('should reject an invalid email domain', (done) => {
    chai
      .request(app)
      .post('/auth')
      .send({ email: 'invalid@invalid.org' })
      .end((err, res) => {
        expect(res).to.have.status(401); // Assuming a different status code for invalid domain
        expect(res.body.authenticated).to.be.false;
        testsCompleted++; // Increment completed tests count
        if (testsCompleted === 2) {
          // If all tests are completed, exit Mocha
          done();
          process.exit(0); // Exit Mocha
        } else {
          done();
        }
      });
  });

  // Add more test cases for various scenarios
});
