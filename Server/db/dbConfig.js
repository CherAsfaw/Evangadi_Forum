const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  host: "localhost",
  user: "evangadi-admin",
  password: "123456",
  database: "evangadi_forum",
  connectionLimit: 10,
});

module.exports = dbConnection.promise();
