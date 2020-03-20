// https://docs.netlify.com/functions/build-with-javascript
const express = require("express");

const app = express();

app.use(express.json());

const functions = ["add", "get-list"];

functions.forEach(endpoint => {
  app.use(`/${endpoint}`, (req, res) => {
    const event = {
      path: endpoint,
      httpMethod: req.method,
      headers: "{Incoming request headers}",
      queryStringParameters: "{query string parameters}",
      body: req.body,
      isBase64Encoded:
        "A boolean flag to indicate if the applicable request payload is Base64-encode"
    };
    const context = {};

    require(`./functions/${endpoint}.js`).handler(
      event,
      context,
      (err, data) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(data.statusCode).send(data.body);
        }
      }
    );
  });
});

app.listen("3000", () => {
  console.log("listening on 3000");
});
