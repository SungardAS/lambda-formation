var request = require("request");
var response = require("cfn-responder");

module.exports = function(err,event,context,obj,physicalResourceId) {
  if (event && event.StackId) {
    var responseStatus = response.SUCCESS;
    if (err) {
      event.Reason = err;
      responseStatus = response.FAILED;
    }
    response.send(event, context, responseStatus, obj, physicalResourceId);
  }
  else {
    context.done(err,obj,physicalResourceId);
  }
};
