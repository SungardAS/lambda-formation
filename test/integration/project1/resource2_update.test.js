var assert = require('assert'),
  update = require('../../fixtures/project1/lib/resources/resource2/update');

describe('project1', function() {
  describe("resource2", function() {

    describe("update", function() {

      it("should fail", function() {
        var event = {
          physicalResourceId: 1
        };

        var context = {
          done: function(err) {
          }
        };
        assert.throws(
          function() {
            update.handler(event,context);
          }
        );
      });
    });

  });
});
