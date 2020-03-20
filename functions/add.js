const { success, serverError, badRequest } = require("../utils/response");
const data = require("../data");

// For client to get the current list of Listings
exports.handler = (event, ctx, cb) => {
  if (event.httpMethod !== "POST" || !event.body) {
    return cb(null, badRequest());
  }

  data
    .addListing(event.body)
    .then(res => cb(null, success(res)))
    .catch(err => cb(err));
};
