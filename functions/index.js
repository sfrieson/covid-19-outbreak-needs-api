const functions = require("firebase-functions");
const { google } = require("googleapis");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

const getAPI = async () => {
  let auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  return google.sheets({ version: "v4", auth });
};

async function getListings(api) {
  let response = await api.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADHSEET_ID,
    range: "'Form Responses'!C:F"
  });

  return response.data.values;
}

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.getListings = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const api = await getAPI();
  const data = await getListings(api);

  res.json({ data });
});
