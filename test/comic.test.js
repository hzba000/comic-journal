const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');
const faker = require('faker');

const {JWT_SECRET, JWT_EXPIRY } = require('../config');
const { startServer, stopServer, app } = require('../server.js');
const { User } = require('../user/user.model');
const { Comic } = require('../comic/comic.model');

const expect = chai.expect; 
chai.use(chaiHttp); 

describe('Integration tests for: /api/comic', function () {
    let testUser, jwtToken;

    //The reason we put true here, is to differentiate our test and production servers in the startServer function in server.js
    before(function () {
        return startServer(true);
    });


    beforeEach(function () {
        testUser = createFakerUser(); //We need a fake user to test on, so we create one here

        return User.hashPassword(testUser.password)
            .then(hashedPassword => {
                return User.create({
                    name: testUser.name,
                    email: testUser.email,
                    username: testUser.username,
                    password: hashedPassword
                }).catch(err => {
                    throw new Error(err);
                });
            })
            .then(createdUser => { //Make sure that user has a JSON Web token to authenticate them before we test their data
                testUser.id = createdUser.id;

                jwtToken = jsonwebtoken.sign(
                    {
                        user: {
                            id: testUser.id,
                            name: testUser.name,
                            email: testUser.email,
                            username: testUser.username
                        }
                    },
                    JWT_SECRET,
                    {
                        algorithm: 'HS256',
                        expiresIn: JWT_EXPIRY,
                        subject: testUser.username
                    }
                );

                const seedData = []; //Seed 10 dummy data comics
                for (let i = 1; i <= 10; i++) {
                    const newComic = createFakerComic();
                    newComic.user = createdUser.id;
                    seedData.push(newComic);
                }
                return Comic.insertMany(seedData)
                    .catch(err => {
                        throw new Error(err);
                });
        });
    });

    afterEach(function () {
        return new Promise((resolve, reject) => {
            // Deletes the entire database.
            mongoose.connection.dropDatabase()
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    });

    after(function () {
        return stopServer();
    });

    it('Should return user comics', function () {
        return chai.request(app)
            .get('/api/comic') //Make a fake get Request
            .set('Authorization', `Bearer ${jwtToken}`) //Make sure JWT token is recognized
            .then(res => { //Comics sent back in response object should meet these characteristics
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const comic = res.body[0];
                expect(comic).to.include.keys('user', 'title', 'content');
                expect(comic.user).to.be.a('object');
                expect(comic.user).to.include.keys('name', 'email', 'username');
                expect(comic.user).to.deep.include({
                    id: testUser.id,
                    username: testUser.username,
                    email: testUser.email,
                    name: testUser.name
                });
        });
    });

    it('Should return a specific comic', function () {//The main difference here is the addition of a parameterized id
        let foundComic;
        return Comic.find()
            .then(comics => {
                expect(comics).to.be.a('array');
                expect(comics).to.have.lengthOf.at.least(1); // ensures seeding worked
                foundComic = comics[0];

                return chai.request(app)
                    .get(`/api/comic/${foundComic.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`); //jwt token bearer authorization
            })
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('user', 'title', 'content');
                expect(res.body).to.deep.include({
                    id: foundComic.id,
                    title: foundComic.title,
                    content: foundComic.content
                });
        });
    });

    it('Should update a specific comic', function () {//We should get a 204 code back (empty response object)
        let comicToUpdate;
        const newComicData = createFakerComic();
        return Comic.find()
            .then(comics => {
                expect(comics).to.be.a('array');
                expect(comics).to.have.lengthOf.at.least(1); // ensures seeding worked
                comicToUpdate = comics[0];

                return chai.request(app)
                    .put(`/api/comic/${comicToUpdate.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .send(newComicData);
            })
            .then(res => {
                expect(res).to.have.status(204);

                return Comic.findById(comicToUpdate.id);
            })
            .then(comic => {
                expect(comic).to.be.a('object');
                expect(comic).to.deep.include({
                    id: comicToUpdate.id,
                    title: newComicData.title,
                    content: newComicData.content
                });
        });
    });

    it('Should delete a specific comic', function () {//We chould get back a 204 code back (empty response object)
        let comicToDelete;
        return Comic.find()
            .then(comics => {
                expect(comics).to.be.a('array');
                expect(comics).to.have.lengthOf.at.least(1); //ensures seeding worked
                comicToDelete = comics[0];

                return chai.request(app)
                    .delete(`/api/comic/${comicToDelete.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`);
            })
            .then(res => {
                expect(res).to.have.status(204);

                return Comic.findById(comicToDelete.id);
            })
            .then(comic => {
                expect(comic).to.not.exist;
            });
    });

    function createFakerUser() {
        return {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            username: `${faker.lorem.word()}${faker.random.number(100)}`,
            password: faker.internet.password(),
            email: faker.internet.email()
        };
    }

    function createFakerComic() {
        return {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs()
        };
    }
});