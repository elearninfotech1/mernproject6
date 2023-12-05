let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "123456",
  database: "mern6pm",
});

connection.connect((err, con) => {
  if (err) throw err;
  //console.log("connected");
});

module.exports = connection;
