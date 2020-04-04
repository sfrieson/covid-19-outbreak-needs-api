const cdnCache = 300;
const publicCache = cdnCache * 2;

/**
 * Adds cache headers to the response.
 * @param {Request} req - Express-style request object
 * @param {Response} res - Express-style response object
 */
function handleCaching(req, res) {
  res.set(
    "Cache-Control",
    `public, max-age=${publicCache}, s-maxage=${cdnCache}`
  );
}

module.exports = handleCaching;
