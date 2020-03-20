let envPromise;

const makeClient = () => {
  if (!envPromise) {
    const contentful = require("contentful-management");
    const client = contentful.createClient({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    });

    envPromise = client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then(space => space.getEnvironment("master"));
  }

  return envPromise;
};

module.exports = function getClient() {
  return makeClient();
};
