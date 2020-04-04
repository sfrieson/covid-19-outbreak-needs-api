/**
 * An attempt at keeping the categories key the same for the front end
 * even if the text changes in the form.
 */

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
  [misc]: /^misc\./i,
  // ex: Services – providing or needing music lessons, tutoring, etc.
  [services]: /^servic/i
};

module.exports = function parseCategories(categoryText) {
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (patterns[key].test(categoryText)) return key;
  }

  console.error(`Unexpected category was introduced: ${categoryText}`);
  return misc;
};
