var destroy = require('../../../../../../lib/resource/delete')
  util = require('../../../../../../lib/util');

module.exports.handler = function(event,context) {
  destroy.apply(this,[event,context,myDelete]);
};

var myDelete = function(err,event,context) {
  if (err)
    return util.done(err);

  util.done(null,event,context);
};
