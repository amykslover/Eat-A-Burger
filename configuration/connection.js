// Set up MySQL connection.
var mysql = require("mysql");
var connection;

if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "burgertime"
  });
}


// Make connection.
connection.connect(function(error) {
  if (error) {
    console.log("Connection Error: " + error.stack);
    return;
  } 
  else {
    console.log("Connected: Thread ID: " + connection.threadId); 
  }
});

// Export connection for our ORM to use.
module.exports = connection;