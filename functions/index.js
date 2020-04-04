const functions = require("firebase-functions");
const { google } = require("googleapis");
const parseCategories = require("../utils/parse-categories");

// https://cloud.google.com/blog/products/serverless/serverless-from-the-ground-up-building-a-simple-microservice-with-cloud-functions-part-1
function handleCors(req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
  }
}

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

const categoryIndex = 2;
function parseAndfilterByPublishedStatus(rows, stati) {
  return rows.reduce((filteredRows, row, i) => {
    // keep the heading row
    if (i === 0) {
      filteredRows.push(row);
    } else if (stati[i] && stati[i][0] === "Published") {
      row[categoryIndex] = parseCategories(row[categoryIndex]);
      filteredRows.push(row);
    }

    return filteredRows;
  }, []);
}

async function getListings(api) {
  const ranges = ["'Form Responses'!A:A", "PublicData", "Status"];
  let response = await api.spreadsheets.values.batchGet({
    spreadsheetId: functions.config().sheets.spreadsheet_id,
    ranges
  });

  // Over all the rows
  const rows = mergeRanges(
    response.data.valueRanges.slice(0, -1).map(valueRange => valueRange.values)
  );

  const publishedRows = parseAndfilterByPublishedStatus(
    rows,
    response.data.valueRanges[ranges.length - 1].values
  );
  return publishedRows;
}

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.getListings = functions.https.onRequest(async (req, res) => {
  handleCors(req, res);
  // Grab the text parameter.
  const api = await getAPI();
  const data = await getListings(api);

  res.json({ data });
});
