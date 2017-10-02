var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;

var users = require("./routes/users");
var policies = require("./routes/policies");
var session = require("./routes/session");

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/session", session);

app.use(function(req, res, next) {
  var token = req.get("Authorization");
  if (!token)
    return res.status(403).send({ error: "Authorization header required" });
  MongoClient.connect("mongodb://localhost/insurance-api", (err, db) => {
    db
      .collection("sessions")
      .find({ token: token })
      .next(function(err, result) {
        db.close();
        if (!result) return res.status(403).send({ error: "Forbidden" });
        res.locals.role = result.role;
        next();
      });
  });
});

app.use("/policies", policies);
app.use("/users", users);

module.exports = app;
