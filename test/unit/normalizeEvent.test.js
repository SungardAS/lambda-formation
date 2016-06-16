var normalizeEvent = require("../../lib/util/normalizeEvent");
var assert = require("assert");

describe("util.normalizeEvent", function() {
  if("should discover a SNS message and return message as the event object") {
    var invokeEvent = {
      Records: [{
        EventSource: "aws:sns",
        Sns: {
          Message: JSON.stringify({
            RequestType: "Create",
            ResourceType: "resource1"
          })
        }
      }]
    };

    var ev = normalizeEvent(invokeEvent);
    assert.equal(ev.RequestType,"Create");
    assert.equal(ev.ResourceType,"resource1");
    assert(ev._originalInvoke);
    assert(ev._normalized);
  }
});
