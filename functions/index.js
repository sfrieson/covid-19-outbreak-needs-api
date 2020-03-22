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

// merges multiple column ranges into one range assuming the rows are in the same order
function mergeRanges(ranges) {
  return ranges.reduce((merged, range) => {
    range.forEach((row, rowNumber) => {
      merged[rowNumber] = [...(merged[rowNumber] || []), ...row];
    });
    return merged;
  }, []);
}

async function getListings(api) {
  const ranges = ["'Form Responses'!A:A", "'Form Responses'!C:F"];
  let response = await api.spreadsheets.values.batchGet({
    spreadsheetId: functions.config().sheets.spreadsheet_id,
    ranges
  });

  // Over all the rows
  const rows = mergeRanges(
    response.data.valueRanges.map(valueRange => valueRange.values)
  );

  return rows;
}

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.getListings = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const api = await getAPI();
  const data = await getListings(api);

  res.json({ data });
});
