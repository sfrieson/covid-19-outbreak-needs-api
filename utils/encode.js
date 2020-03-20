let cryptr;

const getClient = () => {
  const Crypter = require("cryptr");
  return new Crypter(process.env.ENCODE_SECRET);
};

module.exports = {
  encode: val => {
    cryptr = cryptr || getClient();

    return cryptr.encrypt(val);
  },
  decode: val => {
    cryptr = cryptr || getClient();

    return cryptr.decrypt(val);
  }
};
