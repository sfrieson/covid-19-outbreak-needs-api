const response = require("../utils/response");
const { getListings } = require("../data");

exports.handler = (event, ctx, cb) => {
  getListings().then(items => {
    cb(null, response(items));
  });
};
