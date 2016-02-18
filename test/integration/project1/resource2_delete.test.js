var assert = require('assert'),
  destroy = require('../../fixtures/project1/lib/resources/resource2/delete');

describe('project1', function() {
  describe("resource2", function() {

    describe("delete", function() {

      it("should fail", function() {
        var event = {
          physicalResourceId: 1
        };

        var context = {
          done: function(err) {
          }
        };
        assert.throws(
          () => {
            destroy.handler(event,context);
          }
        );
      });
    });

  });
});
