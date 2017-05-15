var _ = require("lodash");

module.exports = function getErrorString(err) {
  if (_.isString(err)) return err;

  if (_.isObject(err) && err.message) return err.message;

  return JSON.stringify(err);
};
