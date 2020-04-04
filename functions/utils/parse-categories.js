const food = "food";
const goods = "goods";
const misc = "misc";
const services = "services";

const keys = [food, goods, misc, services];

const patterns = {
  // ex. Food and Basic Needs – non-emergency help needed. willing to bake, cook, etc.
  [food]: /food/i,
  // ex: Goods – exchange or sale of furniture, baby stuff, other items etc.
  [goods]: /good/i,
  // ex: Misc. – any other non-emergency needs
  [misc]: /misc\./i,
  // ex: Services – providing or needing music lessons, tutoring, etc.
  [services]: /servic/i,
};

/**
 * A method to standardize the category text so that even if the form (slightly) changes it won't change the key.
 * @param {string} categoryText input from the Google Form Category question
 * @returns {string} the category key
 */
function parseCategories(categoryText) {
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (patterns[key].test(categoryText)) return key;
  }

  console.error(`Unexpected category was introduced: ${categoryText}`);
  return misc;
}

module.exports = parseCategories;
