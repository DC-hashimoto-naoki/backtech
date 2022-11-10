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
        password : password
    });
})

app.listen(PORT, () => {
    console.log(__dirname);
    console.log("server is running")
});