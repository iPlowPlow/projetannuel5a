var express  = require("express");
var app = express();
var models = require("./models");

var config = require("config");  // we use node-config to handle environments
require("./env.js");

var bodyParser = require("body-parser");

module.exports = app;
/*app.use(
    session({
        secret: "vidyapathaisalwaysrunning",
        resave: true,
        saveUninitialized: true
    })
);*/


app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());


require("./routes")(app, models);

var port=process.env.PORT || 8888;

var server = app.listen(port, function() {
    console.log("Server started port "+port+"...");
});