var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

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
        db
          .collection("sessions")
          .insert({ token: email, role: result.role }, function(err, result) {
            res.send({ token: email });
            db.close();
          });
      });
  });
});

module.exports = router;
