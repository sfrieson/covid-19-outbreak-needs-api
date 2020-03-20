const getClient = require("./client");
const createListing = data => {
  return {
    id: data.sys.id,
    createdAt: data.sys.createdAt,
    ...data.fields
  };
};

module.exports = {
  getListings: options => {
    return getClient()
      .getEntries()
      .then(res => res.items.map(createListing));
  },
  getListing: options => {
    return getClient()
      .getEntry(options.id)
      .then(createListing);
  }
};
