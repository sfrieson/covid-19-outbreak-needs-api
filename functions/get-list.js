const response = require("../utils/response");
const { getListings } = require("../data");

exports.handler = (event, ctx, cb) => {
  getListing({})
    .then(items => {
      cb(null, response(items));
    })
    .catch(err => {
      cb(err);
    });
};
