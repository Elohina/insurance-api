var express = require("express");
var router = express.Router();
var Policy = require("../models/policy");
var User = require("../models/user");

router.get("/:id/user", function(req, res, next) {
  if (res.locals.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  var id = req.params.id;

  Policy.find({ id: id }, (err, result) => {
    if (!result) {
      res.status(404).send({ error: "Policy not found" });
    }
    User.find({ id: result.clientId }, (err, result) => {
      res.send(result);
    });
  });
});

module.exports = router;
