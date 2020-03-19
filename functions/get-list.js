const response = require("../utils/response");

exports.handler = (event, ctx, cb) => {
  cb(null, response(["list", "of", "stuff"]));
};
