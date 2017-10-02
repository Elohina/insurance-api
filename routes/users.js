var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

/* GET user by id */
router.get("/:id", function(req, res, next) {
  if (res.locals.role !== "user" && res.locals.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  var id = req.params.id;

  MongoClient.connect("mongodb://localhost/insurance-api", (err, db) => {
    db
      .collection("users")
      .find({ id: id })
      .next(function(err, result) {
        db.close();
        if (!result) res.status(404).send({ error: "User not found" });
        res.send(result);
      });
  });
});

/* GET user by name */
router.get("/", function(req, res, next) {
  if (res.locals.role !== "user" && res.locals.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  var name = req.query.name;

  if (!name)
    return res
      .status(400)
      .send({ error: "Please provide a name in query string" });

  MongoClient.connect("mongodb://localhost/insurance-api", (err, db) => {
    db
      .collection("users")
      .find({ name: name })
      .next(function(err, result) {
        db.close();
        if (!result) return res.status(404).send({ error: "User not found" });
        res.send(result);
      });
  });
});

/* GET user's policies by user's name */
router.get("/:name/policies", function(req, res, next) {
  if (res.locals.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  var name = req.params.name;

  MongoClient.connect("mongodb://localhost/insurance-api", (err, db) => {
    db
      .collection("users")
      .find({ name: name })
      .next(function(err, result) {
        if (!result) {
          res.status(404).send({ error: "User not found" });
          return db.close();
        }
        db
          .collection("policies")
          .find({ clientId: result.id })
          .toArray(function(err, result) {
            res.send(result);
            db.close();
          });
      });
  });
});

module.exports = router;
