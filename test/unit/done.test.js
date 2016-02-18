var assert = require('assert'),
  nock = require('nock');
  util = require('../../lib/util');


describe("util done", function() {

  before(function() {
    nock('https://fake.url')
    .put('/', {"Status":"SUCCESS","Reason":"See the details in CloudWatch Log Stream: undefined","StackId":"arn:aws:cloudformation:us-east-1:namespace:stack/stack-name/guid","RequestId":"unique id for this create request","LogicalResourceId":"name of resource in template","Data":{}})
    .reply(200, {});

    nock('https://fake.url')
    .put('/', {"Status":"FAILED","Reason":"See the details in CloudWatch Log Stream: undefined","StackId":"arn:aws:cloudformation:us-east-1:namespace:stack/stack-name/guid","RequestId":"unique id for this create request","LogicalResourceId":"name of resource in template","Data":{}})
    .reply(200, {});
  });


  it("should call context if lambda", function(done) {
    var context = {
      done: function(err,obj) {
        assert(!obj.StackId);
        done();
      }
    };

    util.done(null,{},context,{});
  });

  it("should call cfn-response if CloudFormation", function(done) {
    var context = {
      done: function(err,obj) {
        obj = JSON.parse(obj);
        assert(obj.StackId);
        done();
      }
    };

    util.done(
      null,
      {
        RequestType: "Create",
        RequestId: "unique id for this create request",
        ResponseURL: "https://fake.url",
        ResourceType: "Custom::MyCustomResourceType",
        LogicalResourceId: "name of resource in template",
        StackId: "arn:aws:cloudformation:us-east-1:namespace:stack/stack-name/guid"
      },
      context,{}
    );
  });

  it("should set cfn-response to FAILED for CloudFormation if err", function(done) {
    var context = {
      done: function(err,obj) {
        obj = JSON.parse(obj || {});
        assert(obj.StackId);
        done();
      }
    };

    util.done(
      "This didn't work",
      {
        RequestType: "Create",
        RequestId: "unique id for this create request",
        ResponseURL: "https://fake.url",
        ResourceType: "Custom::MyCustomResourceType",
        LogicalResourceId: "name of resource in template",
        StackId: "arn:aws:cloudformation:us-east-1:namespace:stack/stack-name/guid"
      },
      context,{}
    );
  });

});
