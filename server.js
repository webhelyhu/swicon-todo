const environment = require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

require("./app/router/router.js")(app);

console.log("##################Creating express server. Environment is", process.env.NODE_ENV)
// Create a Server
const port = process.env.PORT || 8080;
const server = app.listen(port, function () {
  const port = server.address().port;

  console.log("Environment is ", process.env.NODE_ENV)
  console.log(`App listening on port ${port}`);
});
