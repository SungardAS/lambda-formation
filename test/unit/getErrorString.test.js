var assert = require("assert");
var util = require("../../lib/util");

describe("util getErrorString", function() {

  it("should work with a string", function() {
    var err = "this is an error";
    var es = util.getErrorString(err);
    assert.equal(es,"this is an error");
  });

  it("should work with an Error object", function() {
    var err = new Error("this is an error");
    var es = util.getErrorString(err);
    assert.equal(es,"this is an error");
  });

  it("should work with any object", function() {
    var err = {"msg": "some custom error"};
    var es = util.getErrorString(err);
    assert.equal(es,'{"msg":"some custom error"}');
  });

});
