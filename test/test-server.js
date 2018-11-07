'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;
const should = chai.should();

const { Post } = require('../models');
const { closeServer, runServer, app } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}


function seedPostData() {
  console.info('seeding blog post data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      comicId: faker.random.number(),
      email: faker.internet.email(),
      content: faker.lorem.paragraph()
    });
  }
  // this will return a promise
  return Post.insertMany(seedData);
}

describe('blog posts API resource', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return seedPostData();
  });

  afterEach(function () {
    return tearDownDb();
  });

  after(function () {
    return closeServer();
  });

  describe('GET endpoint', function () {

    it('should return all existing posts', function () {
      let res;
      return chai.request(app)
        .get('/posts')
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);

          return Post.count();
        })
        .then(count => {
          res.body.should.have.lengthOf(count);
        });
    });

    it('should return posts with right fields', function () {
      let resPost;
      return chai.request(app)
        .get('/posts')
        .then(function (res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.lengthOf.at.least(1);

          res.body.forEach(function (post) {
            post.should.be.a('object');
            post.should.include.keys('id', 'comicId', 'content', 'email', 'publishedAt');
          });

          resPost = res.body[0];
          return Post.findById(resPost.id);
        })
        .then(post => {
          resPost.comicId.should.equal(post.comicId);
          resPost.email.should.equal(post.email);
          resPost.content.should.equal(post.content);
        });
    });
  });


describe('POST endpoint', function(){
  it('should add a new post', function(){
    const newPost = {
      comicId: faker.random.number(),
      email: faker.internet.email(),
      content: faker.lorem.paragraph()
    };

    return chai.request(app)
        .post('/posts')
        .send(newPost)
        .then(function (res){
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'comicId', 'email', 'content', 'publishedAt');
          res.body.id.should.not.be.null;
          res.body.publishedAt.should.not.be.null;
          res.body.comicId.should.equal(newPost.comicId);
          res.body.email.should.equal(newPost.email);
          res.body.content.should.equal(newPost.content);
          return Post.findById(res.body.id);
        })
        .then(function(post){
          post.comicId.should.equal(newPost.comicId);
          post.email.should.equal(newPost.email);
          post.content.should.equal(newPost.content);
        });
  });
});
});







describe("Initial Test for server", function(){
    before(function(){
        return runServer();
    })

    after(function(){
        return closeServer();
    });

    it("should return status code 200", function(){
        return chai
        .request(app)
        .get("/")
        .then(function(res){
            expect(res).to.have.status(200);
        });
    });

    it("should be html", function(){
        return chai
        .request(app)
        .get("/")
        .then(function(res){
            expect(res).to.be.html
        })
    })
});
