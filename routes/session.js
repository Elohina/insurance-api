var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../config");
var User = require('../models/user');

router.post("/", function(req, res, next) {
  var email = req.body.email;

  if (!email)
    return res
      .status(400)
      .send({ error: "Please provide an email in request body" });

  User.findOne({ email: email },  function(err, result) {
    if (!result) {
      res.status(404).send({ error: "User not found" });
      return db.close();
    }
    const payload = {
      email: email
    };
    var token = jwt.sign(payload, config.secret,{
      expiresIn: 1440
    });
    res.send({ token: token });
  });
});

module.exports = router;
