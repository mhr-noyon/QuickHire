const mysql = require("mysql2");
require("dotenv").config();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    port: process.env.DB_PORT || 3306,
});

const db = pool.promise();
db.getConnection()
    .then((connection) => {
        console.log("Connected to the database!");
        connection.release();
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

module.exports = db;
