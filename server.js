//Our list of Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Tells node we are creating an express app
var app = express();
//Selects which port we will be using
var PORT = process.env.PORT || 3000;

//Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Used to point server to a series of "route" files
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Listener - that starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT + ` @ ${new Date().toLocaleString()}`);
  });

