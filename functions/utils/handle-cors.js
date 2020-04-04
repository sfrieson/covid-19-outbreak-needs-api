/**
 * A function to decorate the response with CORS headers.
 * Example taken from: https://cloud.google.com/blog/products/serverless/serverless-from-the-ground-up-building-a-simple-microservice-with-cloud-functions-part-1
 * @param {Request} req Express-like request object
 * @param {Response} res Express-like response object
 */
function handleCORS(req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
  }
}

module.exports = handleCORS;
