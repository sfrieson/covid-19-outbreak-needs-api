const parseCategories = require("./parse-categories");

const categoryIndex = 2;
/**
 * A function to filter out the rows that have a related status row that equals "Published".
 * @param {*[]} rows - rows of a table
 * @param {string[]} stati - Status strings related to the `rows`
 * @returns {*[]} - new array with filtered rows (by reference)
 */
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

module.exports = parseAndfilterByPublishedStatus;
