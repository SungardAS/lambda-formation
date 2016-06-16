var _ = require("lodash");

module.exports = function(event,context) {
  var ev;

  if (
    event
    && event.Records
    && event.Records[0]
    && event.Records[0].EventSource === "aws:sns"
  ) {
    try {
      ev = JSON.parse(event.Records[0].Sns.Message);
      ev._originalInvoke = event;
    }
    catch(error) {
      throw "Detected SNS Message but payload not parsable JSON";
    }
  }
  else {
    ev = event;
  }
  ev._normalized = true;
  return ev;
};
