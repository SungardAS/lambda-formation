var assert = require('assert'),
  destroy = require('../../fixtures/project1/lib/resources/resource1/delete');

describe('project1', function() {
  describe("resource1", function() {

    describe("delete", function() {
      it("should fail if no PhysicalResourceId is provided", function(cb) {
        var event = {};

        var context = {
          done: function(err) {
            assert(err);
            cb();
          }
        };
        destroy.handler(event,context);
      });

      it("should run if PhysicalResourceId (PhysicalResourceId) is provided", function(cb) {
        var event = {
          PhysicalResourceId: 1
        };

        var context = {
          done: function(err) {
            assert.ifError(err);
            cb();
          }
        };
        destroy.handler(event,context);
      });

      it("should run if PhysicalResourceId (physicalResourceId) is provided", function(cb) {
        var event = {
          physicalResourceId: 1
        };

        var context = {
          done: function(err) {
            assert.ifError(err);
            cb();
          }
        };
        destroy.handler(event,context);
      });

      it("should run if PhysicalResourceId (id) is provided", function(cb) {
        var event = {
          id: 1
        };

        var context = {
          done: function(err) {
            assert.ifError(err);
            cb();
          }
        };
        destroy.handler(event,context);
      });
    });
  });
});
