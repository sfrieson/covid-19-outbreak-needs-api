let client;
module.exports = function getClient() {
  client =
    client ||
    require("contentful").createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    });

  return client;
};
