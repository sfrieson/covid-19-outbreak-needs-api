/**
 * Takes multiple portions of a table and merges them into one table.
 * @param {*[][][]} ranges - An array of 2D arrays (table range)
 * @returns {*[][]} The multiple ranges merged into one 2D array
 */
function mergeRanges(ranges) {
  return ranges.reduce((merged, range) => {
    range.forEach((row, rowNumber) => {
      merged[rowNumber] = [...(merged[rowNumber] || []), ...row];
    });
    return merged;
  }, []);
}

module.exports = mergeRanges;
