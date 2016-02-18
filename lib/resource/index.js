var create = require('./create'),
destroy = require('./delete'),
index = require('./projectIndex'),
update = require('./update');

module.exports = {
  create: create,
  delete: destroy,
  index: index,
  update: update
};
