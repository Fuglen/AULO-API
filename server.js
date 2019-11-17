#!/usr/bin/env node
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models/index");
const News = db.sequelize.models.news;
const Schedule = db.sequelize.models.schedule;
const scheduleJSON = require("./JSON/schedule");
const https = require('https');
const fs = require('fs');
const port = 8000;

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var options = {
    key: key,
    cert: cert
};

// Default API path
const p = "/api/1/";

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
/* 
// API endpoint get user by username
app.get("/api/user/getuserbyname/:username", function (req, res) {
    this.username = req.params.username;
    return users
        .findAll({
            where: {
                username: username
            }
        })
        .then(function (result) {
            res.send(result);
        });
}); */

/* 
app.get("/api/user/getuserbyid/:id", function (req, res) {
    this.userId = req.params.id;
    console.log(userId);
});
 */
app.post(p + "post/test", function (req, res) {
    // var data = JSON.stringify(req.body);
    console.log(req.body.text);      // your JSON 
    console.log(req.ip);      // your JSON
    res.send();    // echo the result back
});

app.post(p + "news/create", function (req, res) {
    var data = req.body;
    console.log(data);
    return News.create({
        id: "",
        title: data.title,
        text: data.text,
        author: data.author,
        date_created: data.date_created
    }).then(function (News) {
        if (News) {
            res.send(News);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
});

app.get(p + "news/all", function (req, res) {
    return News.findAll().then(function (result) {
        res.send(result);
    });
});

app.get(p + "news/all/recent", function (req, res) {
    return News.findAll().then(function (result) {
        res.send(result);
    });
});

app.get(p + "schedule/:team/:class", function (req, res) {
    return Schedule.findAll().then(function (result) {
        res.send(JSON.stringify(result));
    });
});

app.get(p + "test", function (req, res) {
    res.send({
        hello: "world"
    });
});

var server = https.createServer(options, app);
server.listen(port, () => {
    console.log("server starting on port : " + port)
});
