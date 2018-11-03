const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { app, runServer, closeServer } = require("../server");


chai.use(chaiHttp);

describe("Initial Test", function(){
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