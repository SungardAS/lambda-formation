var assert = require('assert'),
  resource1 = require('../../fixtures/project1/lib/resources/resource1');

describe('project1', function() {
  describe("resource1 handler", function() {


    it("should fail without requestType", function() {
      var event = {};

      var context = {
        done: function(err) {
          assert(err);
        }
      };
      assert.throws(
        function() {
          resource1.handler(event,context);
        }
      );
    });


    describe("create", function() {

      it("should run without error", function(cb) {
        var event = {
          requestType: "create"
        };

        var context = {
          done: function(err,data,id) {
            assert.ifError(err);
            assert(id,"Create must return a unique ID");
            cb();
          }
        };
        resource1.handler(event,context);
      });
    });

    describe("update", function() {

      it("should fail if no PhysicalResourceId is provided", function(cb) {
        var event = {
          requestType: "update"
        };

        var context = {
          done: function(err) {
            assert(err);
            cb();
          }
        };
        resource1.handler(event,context);
      });

      it("should run if PhysicalResourceId (PhysicalResourceId) is provided", function(cb) {
        var event = {
          requestType: "update",
          PhysicalResourceId: 1
        };

        var context = {
          done: function(err) {
            assert.ifError(err);
            cb();
          }
        };
        resource1.handler(event,context);
      });

      it("should run if PhysicalResourceId (physicalResourceId) is provided", function(cb) {
        var event = {
          requestType: "update",
          physicalResourceId: 1
        };

        var context = {
          done: function(err) {
            assert.ifError(err);
            cb();
          }
        };
        resource1.handler(event,context);
      });

      it("should run if PhysicalResourceId (id) is provided", function(cb) {
        var event = {
          requestType: "update",
          id: 1
        };

        var context = {
          done: function(err) {
            assert.ifError(err);
            cb();
          }
        };
        resource1.handler(event,context);
      });
    });


    describe("delete", function() {
      it("should fail if no PhysicalResourceId is provided", function(cb) {
        var event = {
          requestType: "delete"
        };

        var context = {
          done: function(err) {
            assert(err);
            cb();
          }
        };
        resource1.handler(event,context);
      });

      it("should run if PhysicalResourceId (PhysicalResourceId) is provided", function(cb) {
        var event = {
          requestType: "delete",
          PhysicalResourceId: 1
        };

        var context = {
          done: function(err) {
            assert.ifError(err);
            cb();
          }
        };
        resource1.handler(event,context);
      });

      it("should run if PhysicalResourceId (physicalResourceId) is provided", function(cb) {
        var event = {
          requestType: "delete",
          physicalResourceId: 1
        };

        var context = {
          done: function(err) {
            assert.ifError(err);
            cb();
          }
        };
        resource1.handler(event,context);
      });

      it("should run if PhysicalResourceId (id) is provided", function(cb) {
        var event = {
          requestType: "delete",
          id: 1
        };

        var context = {
          done: function(err) {
            assert.ifError(err);
            cb();
          }
        };
        resource1.handler(event,context);
      });
    });
  });
});
