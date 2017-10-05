var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Policy = require("../models/policy")


/*
* Get user by id
* GET /users/:id
*/
router.get("/:id", function(req, res, next) {
  if (res.locals.role !== "user" && res.locals.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  var id = req.params.id;

  User.findOne({ id: id }, (err, result) => {
    if (!result) res.status(404).send({ error: "User not found" });
    return res.send(result);
  });
});

/*
* Get user by name
* GET /users=?name=:user_name
*/
router.get("/", function(req, res, next) {
  if (res.locals.role !== "user" && res.locals.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  var name = req.query.name;

  if (!name)
    return res
      .status(400)
      .send({ error: "Please provide a name in query string" });

  User.findOne({ name: name }, (err, result) => {
    if (!result) return res.status(404).send({ error: "User not found" });
    return res.send(result);
  });
});

/*
* Get user's policies by user's name
* GET /users/:name/policies
*/
router.get("/:name/policies", function(req, res, next) {
  if (res.locals.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  var name = req.params.name;

  User.findOne({ name: name }, (err, result) => {
    if (!result) {
      return res.status(404).send({ error: "User not found" });
    }
    Policy.find({ clientId: result.id }, (err, result) => {
      if (!result) {
        return res.status(404).send({ error: "User has no policies" });
      }
      return res.send(result);
    });
  });
});

module.exports = router;
