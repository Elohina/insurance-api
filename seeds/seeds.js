var request = require("request");
var User = require("../models/user");
var Policy = require("../models/policy");
var clean = require("mongo-clean");
var MongoClient = require("mongodb").MongoClient;

var db;
MongoClient.connect("mongodb://localhost/insurance-api", (err, database) => {
  if (err) throw error;

  // Delete all data in database
  clean(database, function() {
    db = database;
    fillDatabase();
  });
});

function fillDatabase() {
  request("http://www.mocky.io/v2/5808862710000087232b75ac", function(
    error,
    response,
    body
  ) {
    if (error) throw error;
    var data = JSON.parse(body).clients;
    db.collection("users").insert(data, function(error, record) {
      if (error) throw error;
      console.log("users data saved");
    });
    request("http://www.mocky.io/v2/580891a4100000e8242b75c5", function(
      error,
      response,
      body
    ) {
      if (error) throw error;
      var data = JSON.parse(body).policies;
      db.collection("policies").insert(data, function(error, record) {
        if (error) throw error;
        console.log("policies data saved");
        db
          .collection("users")
          .createIndex("id", { unique: true }, function(error, record) {
            if (error) throw error;
            console.log("users id index created");
            db
              .collection("policies")
              .createIndex("id", { unique: true }, function(error, record) {
                if (error) throw error;
                console.log("policies id index created");
                db.close();
              });
          });
      });
    });
  });
}
