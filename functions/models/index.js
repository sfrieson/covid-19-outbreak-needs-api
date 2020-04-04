const { google } = require("googleapis");
const functions = require("firebase-functions");

const mergeRanges = require("../utils/merge-ranges");
const parseAndfilterByPublishedStatus = require("../utils/parse-filter-status");

const getSheetsAPI = async () => {
  let auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
};

/**
 * Returns a table (2D array) of published listings from the linked Google Sheet.
 * @returns {Promise<*[][]>}
 */
async function getListings() {
  const api = await getSheetsAPI();
  const ranges = ["'Form Responses'!A:A", "PublicData", "Status"];
  let response = await api.spreadsheets.values.batchGet({
    spreadsheetId: functions.config().sheets.spreadsheet_id,
    ranges,
  });

  // Over all the rows
  const rows = mergeRanges(
    response.data.valueRanges
      .slice(0, -1)
      .map((valueRange) => valueRange.values)
  );

  const publishedRows = parseAndfilterByPublishedStatus(
    rows,
    response.data.valueRanges[ranges.length - 1].values
  );
  return publishedRows;
}

module.exports = {
  getListings,
};
