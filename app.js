const bodyParser = require("body-parser");
const express = require("express");
const routerController = require("./Route/router-Controller");
require("./dataBAse");

const app = express();

app.use(bodyParser.json());

app.use(routerController);

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });

app.listen(3000);
