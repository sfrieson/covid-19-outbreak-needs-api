const response = require("../utils/response");
const data = require("../data");

// For client to get the current list of Listings
exports.handler = (event, ctx, cb) => {
  data
    .getListings({ isForClient: false })
    .then(items => {
      cb(null, response.success(items));
    })
    .catch(err => {
      cb(err);
    });
};
