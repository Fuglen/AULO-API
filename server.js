#!/usr/bin/env node
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Object Relational Mapping
const db = require("./models/index");
const News = db.sequelize.models.news;
const Schedule = db.sequelize.models.schedule;
const Parents = db.sequelize.models.parents;
const https = require("https");
const fs = require("fs");
const port = 8000;

var key = fs.readFileSync(__dirname + "/certs/selfsigned.key");
var cert = fs.readFileSync(__dirname + "/certs/selfsigned.crt");
var options = {
  key: key,
  cert: cert
};

// Root API path
const p = "/api/1/";

// API headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// API endpoint get user by username
app.get(p + "parent/byusername/:username", function(req, res) {
  this.username = req.params.username;
  return Parents.findAll({
    where: {
      username: username
    }
  }).then(function(result) {
    res.json(result);
  });
});

// Test post endpoint
app.post(p + "post/test", function(req, res) {
  // var data = JSON.stringify(req.body);
  var data = req;
  console.log(req.body.username); // your JSON
  console.log(req.ip); // your JSON
  res.json(data.body); // echo the result back
});

// Create news
app.post(p + "news/create", function(req, res) {
  var data = req.body;
  console.log(data);
  return News.create({
    id: "",
    title: data.title,
    text: data.text,
    author: data.author,
    date_created: data.date_created
  }).then(function(News) {
    if (News) {
      res.send(News);
    } else {
      res.status(400).send("Error in insert new record");
    }
  });
});

// Get all news
app.get(p + "news/all", function(req, res) {
  return News.findAll().then(function(result) {
    res.send(result);
  });
});

app.get(p + "news/all/recent", function(req, res) {
  return News.findAll().then(function(result) {
    res.send(result);
  });
});

app.get(p + "schedule/:team", function(req, res) {
  var days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  return Schedule.findAll({
    attributes: days,
    where: { team: req.params.team }
  }).then(function(result) {
    var data = result[0].dataValues;
    var result = "";
    console.log(data.monday);

    for (days in data) {
      result = result + data[days].replace(/[1234567:"" ]/g, "") + ":";
    }

    res.send(result);
  });
});

app.get(p + "test", function(req, res) {
  res.send({
    hello: "world"
  });
});

var server = https.createServer(options, app);
server.listen(port, () => {
  console.log("server starting on port : " + port);
});
