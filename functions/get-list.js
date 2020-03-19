exports.handler = (event, ctx, cb) => {
  cb(null, { statusCode: 200, body: ["list", "of", "stuff"] });
};
