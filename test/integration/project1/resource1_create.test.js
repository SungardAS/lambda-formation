var assert = require('assert'),
  create = require('../../fixtures/project1/lib/resources/resource1/create');

describe('project1', function() {
  describe("resource1", function() {

    describe("create", function() {

      it("should run without error", function(cb) {
        var event = {};

        var context = {
          done: function(err,data,id) {
            assert.ifError(err);
            assert(id,"Create must return a unique ID");
            cb();
          }
        };
        create.handler(event,context);
      });
    });

  });
});
