process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server');
var User = require('../models/user');

var should = chai.should();
chai.use(chaiHttp);

describe('Users', function() {
  beforeEach(function(done) {
    User.collection.drop();

    var newUser = new User({
      email: 'example@email.com',
      forename: 'Bob',
      surname: 'Uncle'
    });

    newUser.save(function(err) {
      if (err) throw err
      done();
    });
  });

  after(function(done) {
    User.collection.drop();
    done();
  });

  describe('GET /users', function() {
    it('should GET all users', function(done) {
      chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.have.property('email');
          res.body[0].should.have.property('forename');
          res.body[0].should.have.property('surname');
          res.body[0].email.should.equal('example@email.com');
          res.body[0].forename.should.equal('Bob');
          res.body[0].surname.should.equal('Uncle');
          done();
        });
    });

    it('should GET a user by the given id', function(done) {
      var newUser = new User({
        email: 'user@email.com',
        forename: 'Another',
        surname: 'User'
      });

      newUser.save(function(err, data) {
        chai.request(server)
          .get('/api/users/' + data._id)
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('email');
            res.body.should.have.property('forename');
            res.body.should.have.property('surname');
            res.body.email.should.equal('user@email.com');
            res.body.forename.should.equal('Another');
            res.body.surname.should.equal('User');
            res.body.should.have.property('_id').eql(data.id);
            done();
          });
      });
    });
  });

  describe('POST /users', function() {
    it('should POST a user', function(done) {
      var newUser = {
        email: 'user@email.com',
        forename: 'Another',
        surname: 'User'
      };

      chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User created!');
          User.count({}, function(err, count) {
            count.should.equal(2);
          });
          done();
        });
    });

    it('email field is required', function(done) {
      var newUser = {
        forename: 'Another',
        surname: 'User'
      };

      chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.have.property('kind').eql('required');
          done();
        });
    });
  });
});