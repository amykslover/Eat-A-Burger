// Import the ORM to create functions that will interact with the database.
var orm = require("../configuration/orm.js");

var burger = {
  read: function(callback) {
    orm.read("burgers", function(response) {
      callback(response);
    });
  },
  //Variables columns and values are arrays.
  //We will be creating a burger object with a column of name and value of 'burger name'
  create: function(columns, values, callback) {
    orm.create("burgers", columns, values, function(response) {
      callback(response);
    });
  },
  //The columnValues portion of the url will be something like:
  //{name: Double Cheeseburger} and the condition will be {id: 'object ID'}
  update: function(columnValues, condition, callback) {
    console.log('models columnValues');    
    console.log(columnValues);
    console.log('models condition');    
    console.log(condition);
    
    orm.update("burgers", columnValues, condition, function(response) {
      callback(response);
    });
  },
  delete: function(condition,callback) {
    orm.delete("burgers", condition, function(response) {
      callback(response);
    });    
  }
};

//Export database functions for the controller
module.exports = burger;
