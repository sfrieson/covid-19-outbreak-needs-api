const getClient = require("./client");

module.exports = {
  getListings: options => {
    return getClient()
      .getEntries()
      .then(res => res.items);
  }
};
