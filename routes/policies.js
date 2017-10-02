var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

router.get("/:id/user", function(req, res, next) {
  if (res.locals.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  var id = req.params.id;

  MongoClient.connect("mongodb://localhost/insurance-api", (err, db) => {
    db
      .collection("policies")
      .find({ id: id })
      .next(function(err, result) {
        if (!result) {
          res.status(404).send({ error: "Policy not found" });
          return db.close();
        }
        db
          .collection("users")
          .find({ id: result.clientId })
          .next(function(err, result) {
            res.send(result);
            db.close();
          });
      });
  });
});

module.exports = router;
