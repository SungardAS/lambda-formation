var assert = require('assert'),
  create = require('../../fixtures/project1/lib/resources/resource2/create');

describe('project1', function() {
  describe("resource2", function() {

    describe("create", function() {

      it("should fail", function() {
        var event = {};

        var context = {
          done: function(err) {
          }
        };
        assert.throws(
          function() {
            create.handler(event,context);
          }
        );
      });
    });

  });
});
