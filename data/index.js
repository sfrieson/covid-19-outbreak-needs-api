const getClient = require("./client");
const clientFields = [
  "title",
  "category",
  "details",
  "status",
  "id",
  "createdAt"
];
const createListing = (data, isForClient) => {
  const listing = {
    id: data.sys.id,
    createdAt: data.sys.createdAt,
    ...data.fields
  };

  if (isForClient) {
    return clientFields.reduce((obj, key) => {
      obj[key] = listing[key];
      return obj;
    }, {});
  }

  const { decode } = require("../utils/encode");

  listing.name = decode(listing.name);
  listing.phoneNumber = decode(listing.phoneNumber);
  listing.email = decode(listing.email);

  return listing;
};

module.exports = {
  getListings: ({ isForClient }) => {
    return getClient()
      .getEntries()
      .then(res =>
        res.items.map(listing => createListing(listing, isForClient))
      );
  },
  getListing: ({ id, isForClient }) => {
    return getClient()
      .getEntry(id)
      .then(item => createListing(item, isForClient));
  }
};
