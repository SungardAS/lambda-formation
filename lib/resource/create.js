var util = require('../util');

module.exports = function(event,context,cb) {

  if (typeof cb !== 'function') {
    throw("cb must be function");
  }
  else {
    return cb(null,event,context);
  }

};
