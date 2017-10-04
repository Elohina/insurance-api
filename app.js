var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var jwt = require("jsonwebtoken");

var users = require("./routes/users");
var policies = require("./routes/policies");
var session = require("./routes/session");

var User = require("./models/user");

var config = require("./config");

var app = express();

var mongoose = require('mongoose');
mongoose.connect(config.database, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/session", session);

app.use(function(req, res, next) {
  var token = req.get("Authorization");
  if (!token)
    return res.status(403).send({ error: "Authorization header required" });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (!err) {
      User.findOne({email: decoded.email}, (err, user) => {
        if (!user) return res.status(403).send({ error: "Forbidden" });
        res.locals.role = user.role;
        next();
      });
    } else {
      return res.status(403).send({ error: "Failed to autenticate token" });
    }
  });
});

app.use("/policies", policies);
app.use("/users", users);

module.exports = app;
