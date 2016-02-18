var lambdaFormation = require('../../');
var assert = require('assert');

describe("load", function() {
  it("should load", function() {
    assert(lambdaFormation);
  });

  it("should have util", function() {
    assert(lambdaFormation.util);
  });

  it("should have util.done", function() {
    assert(lambdaFormation.util.done);
  });
});
