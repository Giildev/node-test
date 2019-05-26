"use strict";
exports.__esModule = true;
var express_1 = require("express");
var fetch = require("node-fetch");
var app = express_1["default"]();
var port = 3000;
app.get("/", function (req, res) {
    res.send("The sedulous hyena ate the antelope!");
});
app.get("/api/user/:userId", function (req, res) {
    var userId = req.params.userId;
    fetch("https://reqres.in/api/users/" + userId)
        .then(function (response) {
        return response.json();
    })
        .then(function (result) {
        res.send(result);
    });
});
app.listen(port, function () {
    console.log("Listening on port " + port);
});
