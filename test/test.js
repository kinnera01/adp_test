// let assert = require('assert');
let expect = require("chai").expect;
let request = require("request");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
//test for getting data
describe("Get Test", function() {
  it("Getting data should return 200", function(done) {
    request.get("https://interview.adpeai.com/api/v1/get-task", function(
      err,
      res
    ) {
      expect(res.statusCode).to.equal(200);
      //   expect(res.body).to.equal("wrong header");
      done();
    });
  });
});
//test for posting data
describe("Post Test", function() {
  let data = {
    id: 1234567834,
    result: 123333245
  };
  it("Post data should return 200", function() {
    request.post(
      "https://interview.adpeai.com/api/v1/submit-task",
      { myparam: data },
      function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      }
    );
  });
});
