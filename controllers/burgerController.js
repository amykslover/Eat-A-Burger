var express = require("express");

var router = express.Router();

// Import the model to use the database functions.
var burger = require("../models/burgerModel.js");

//User visits url "/" and a function is run
router.get("/", function(request, response) {
 
  burger.read(function(data) {
    var burgersObject = {
      burgers: data
    };

    console.log(burgersObject);
    response.render("index", burgersObject);
  });
});



router.post("/api/burgers", function(request, response) {
  // console.log('Controller Request');
  // console.log(request);
  // console.log('Controller Response');
  // console.log(response);
  burger.create(
    [
      "name"
    ], 
    [
      request.body.name
    ], 
    function(result) {
      console.log('Funtion Result');
      console.log(result);
    // Send back the ID of the new burger
    response.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(request, response) {
  var condition = "id = " + request.params.id;

  console.log("condition", condition);

  burger.update({
    eaten: request.body.eaten
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return result.status(404).end();
    } else {
      result.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
