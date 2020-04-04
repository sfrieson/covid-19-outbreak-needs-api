// https://firebase.google.com/docs/functions/write-firebase-functions
const functions = require("firebase-functions");

const handleCORS = require("./utils/handle-CORS");
const model = require("./models");

exports.getListings = functions.https.onRequest(async (req, res) => {
  try {
    handleCORS(req, res);
    const data = await model.getListings();
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
