var connection = require("../configuration/connection.js");

function printQuestionMarks(length) {
  var array = [];
  
  for (var i = 0; i < length; i++) {
  	array.push("?");
  }
  return array.toString();
}

function objectSQL(object) {
  var array = [];

  for (var key in object) {
    var value = object[key];
    if (Object.hasOwnProperty.call(object, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      array.push(key + "=" + value);
    }
  }
  return array.toString();
}


var orm = {
  read: function(table, callback) {
    var queryString = "SELECT * FROM " + table + ";";
    
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      } 
      else {
      	callback(result);
      }
  	});
  },
  create: function(table, columns, values, callback) {
        var queryString = "INSERT INTO " + table;
            queryString += " (";
            queryString += columns.toString();
            queryString += ") ";
            queryString += "VALUES (";
            queryString += printQuestionMarks(values.length);
            queryString += ") ";

    connection.query(queryString, values, function(error, result) {
      if (error) {
        throw error;
      } 
      else {
      	callback(result);
      }
  	});
  },

  update: function(table, columnValues, condition, callback) {
  	var queryString = "UPDATE " + table + " SET ";
  		  queryString+= objectSQL(columnValues);
  		  queryString+= " WHERE ";
  		  queryString+= condition;
    
    console.log(queryString);
    
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      } 
      else {
      	callback(result);
      }
  	});
  },
  
  delete: function(table, condition, callback) {
  	var queryString = "DELETE FROM " + table + " WHERE " + condition;
    
    console.log(queryString);

    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      } 
      else {
      	callback(result);
      }
  	});
  }
};

module.exports = orm;