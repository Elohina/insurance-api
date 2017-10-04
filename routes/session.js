var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var jwt = require("jsonwebtoken");
var config = require("../config");

router.post("/", function(req, res, next) {
  var email = req.body.email;

  if (!email)
    return res
      .status(400)
      .send({ error: "Please provide an email in request body" });

  MongoClient.connect("mongodb://localhost/insurance-api", (err, db) => {
    db
      .collection("users")
      .find({ email: email })
      .next(function(err, result) {
        if (!result) {
          res.status(404).send({ error: "User not found" });
          return db.close();
        }
        const payload = {
          user: email
        };
        var token = jwt.sign(payload, config.secret,{
          expiresIn: 1440
        });
        db
          .collection("sessions")
          .insert({ token: token, role: result.role }, function(err, result) {
            res.send({ token: token });
            db.close();
          });
      });
  });
});

module.exports = router;
