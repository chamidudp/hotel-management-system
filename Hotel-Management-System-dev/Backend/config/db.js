require('dotenv').config()
const mysql = require("mysql2");

const connection = mysql.createConnection(process.env.DATABASE_URL)

if (connection) {
    console.log("Database connected")
} else {
    console.log("Database connection failed")
}

module.exports = connection;