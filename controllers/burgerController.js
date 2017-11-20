var express = require("express");

var router = express.Router();

// Import the model to use the database functions.
var burger = require("../models/burgerModel.js");

//User visits url "/" and a function is run
router.get("/", function(request, response) {
 
  burger.read(function(data) {

    var handlebarsObject = {
      burgers: data
    };

    console.log(handlebarsObject);
    response.render("index", handlebarsObject);
  });

});



router.post("/api/burgers", function(request, response) {

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
  console.log("Controller Condition")
  console.log(condition);

  burger.update(
  {
    eaten: request.body.eaten
  }, 

  condition, 

  function(result) {

    if (result.affectedRows == 0) {
      return response.status(404).end();
    } 
    else {
      response.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(request, response) {
  var condition = "id = " + request.params.id;

  burger.delete(condition, function(result) {
    console.log(result)
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return response.status(404).end();
    } else {
      response.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
