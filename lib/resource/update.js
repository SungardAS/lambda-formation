var util = require('../util');

module.exports = function(event,context,cb) {

  try {
    util.getPhysicalResourceId(event, context);
  }
  catch(e) {
    return util.done(e.message, event, context);
  }

  if (typeof cb !== 'function') {
    return cb("cb must be function");
  }
  else {
    return cb(null,event,context);
  }

};
