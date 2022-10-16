require('dotenv').config();
const mysql = require('mysql2');

// Creates connection variable to localhost using .env variables
const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Connects to mysql and executes these commands (drops database if exists and recreates it)
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql.");
    connection.query("DROP DATABASE IF EXISTS blog_AJ", function (err, result) {
        if (err) throw err;
        console.log("Database dropped if existed.");

        connection.query("CREATE DATABASE blog_AJ", function (err, result) {
            if(err) throw err;
            console.log("Database created.");
            // exits process once complete
            process.exit(0);
        })
    })
})

