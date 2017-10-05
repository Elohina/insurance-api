var express = require("express");
var router = express.Router();
var Policy = require("../models/policy");
var User = require("../models/user");

/*
* Get user linked to a policy number
* GET /policies/:id/user
*/
router.get("/:id/user", function(req, res, next) {
  if (res.locals.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  var id = req.params.id;

  Policy.findOne({ id: id }, (err, result) => {
    if (!result) {
      return res.status(404).send({ error: "Policy not found" });
    }
    User.findOne({ id: result.clientId }, (err, result) => {
      return res.send(result);
    });
  });
});

module.exports = router;
