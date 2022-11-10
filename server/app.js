const express = require("express");
const { fstat } = require("fs");
const app = express();
const PORT = 3000;
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public/login')));
app.use(express.static(__dirname + '/public'));

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/create", (req, res) => {
    let login = req.body.login;
    let password = req.body.password;

    res.render("create", {
        login: login,
        password: password
    });
})

app.listen(PORT, () => {
    console.log(__dirname);
    console.log("server is running")
});

/**
 * データベースの設定
 * 
 */

const mysql = require('mysql2');
const { Sequelize, DataType, DataTypes } = require("sequelize");

const sequelize = new Sequelize('backtech', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    /**
     * カラムの設定
     */
    key: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '主キー'
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT
    }
}, {
    /**
     * テーブル設定
     */
});

(async () => {
    await User.sync({ force: true });
    const user1 = await User.create({ username: 'TEST', password: 'pass' });
    const user2 = await User.create({ username: 'TEST2', password: 'pass' });
    const rows = await User.findAll();
    rows.forEach(row => {
        const id = row.key;
        const name = row.username;
        const pass = row.password;
        console.log(`${id}:${name}:${pass}`);
    })
    await sequelize.close();
})()

/**
 * MySQL
 */

function connect2sql() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'backtech'
    });

    connection.connect();

    connection.query('SHOW databases;', (err, results, fields) => {
        if (err) throw err;
        console.log(results);
    });

    connection.end();
}