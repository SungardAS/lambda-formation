var util = require('../util');

module.exports = function(event,context,cb) {

  if (typeof cb !== 'function') {
    cb("cb must be function");
  }
  else {
    cb(null,event,context);
  }

};
