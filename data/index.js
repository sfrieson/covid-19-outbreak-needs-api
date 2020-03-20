const getClient = require("./client");
const clientFields = [
  "title",
  "category",
  "details",
  "status",
  "id",
  "createdAt"
];
const parseListingData = (data, isForClient) => {
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

const createListing = data => {
  const { encode } = require("../utils/encode");

  return {
    title: {
      "en-US": data.title
    },
    name: {
      "en-US": encode(data.name)
    },
    category: {
      "en-US": data.category
    },
    details: {
      "en-US": data.details
    },
    phoneNumber: {
      "en-US": encode(data.phoneNumber)
    },
    email: {
      "en-US": encode(data.email)
    },
    status: {
      "en-US": false
    }
  };
};

module.exports = {
  getListings: ({ isForClient }) => {
    return getClient()
      .then(client => client.getEntries())
      .then(res =>
        res.items.map(listing => parseListingData(listing, isForClient))
      );
  },
  getListing: ({ id, isForClient }) => {
    return getClient()
      .then(client => client.getEntry(id))
      .then(item => parseListingData(item, isForClient));
  },
  addListing: data => {
    const listing = createListing(data);

    return getClient().then(client =>
      client.createEntry("listing", { fields: listing })
    );
  }
};
