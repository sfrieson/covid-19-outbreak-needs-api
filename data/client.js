module.exports = function getClient() {
  return require("contentful").createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });
};
