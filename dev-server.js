const express = require("express");

const app = express();

const functions = ["get-list"];

functions.forEach(endpoint => {
  app.get(`/${endpoint}`, (req, res) => {
    const event = {
      endpoint
    };
    const context = {};

    require(`./functions/${endpoint}.js`).handler(
      event,
      context,
      (err, data) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(data.statusCode).json(data.body);
        }
      }
    );
  });
});

app.listen("3000", () => {
  console.log("listening on 3000");
});
