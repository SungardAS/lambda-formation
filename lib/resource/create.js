var util = require('../util');

module.exports = function(event,context,cb) {

  if (typeof cb !== 'function') {
    return cb("cb must be function");
  }
  else {
    return cb(null,event,context);
  }

};
