var update = require('../../../../../../lib/resource/update')
  util = require('../../../../../../lib/util');

module.exports.handler = function(event,context) {
  update.apply(this,[event,context,myUpdate]);
};

var myUpdate = function(err,event,context) {
  if (err)
    return util.done(err);

  util.done(null,event,context);
};
