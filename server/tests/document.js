// this will work when im using environment variables ;)
process.env.NODE_ENV = 'test';


const server = require('../../server');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);


describe('Documents', () => {

  describe('/getDocument', function() {
    it('It Should return the document with given id', (done) => {
      const document = {
        roomId: '1234' 
      }
      chai.request(server)
      .post('/getDocument')
      .send(document)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('roomID');
        res.body.should.have.property('content');
        done();
      })

    });
  });

  describe('/generateDocument', function() {
    it('It should return a brand new document', (done) => {
      chai.request(server)
      .get('/generateDocument')
      .end((err,res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('roomID');
        res.body.should.have.property('content').eql('');
        done();
      });

    });
  });

  describe('/updateDocument', function() {
    it('It should update the document 1234 with new content', (done) => {
      const document = {
        title: 'Test Case',
        roomID: '1234',
        content:'console.log("For Testing purposes only");'
      }
      chai.request(server)
      .post('/updateDocument')
      .send(document)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.eql(1);
        done();
      })

    });
  });

  // Currently dont have a good solution to run the user submitted code.
  // describe('/runDocument', function() {
  //   it('It should run the provided code against default set of tests', (done) => {
  //     const document = {
  //       content:'console.log("For Testing purposes only");'
  //     }
  //     chai.request(server)
  //     .post('/updateDocument')
  //     .send(document)
  //     .end((err,res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a('array');
  //       res.body[0].should.eql(1);
  //       done();
  //     })

  //   });
  // });


});




