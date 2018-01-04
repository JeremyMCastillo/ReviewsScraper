var express = require('express');
var bodyParser = require('body-parser');

var config = require('./app.config');

var app = express();
const http = require('http').Server(app);
app.use(bodyParser.json());

// Routes for API Objects
require('./models/config').route(app, config);
require('./models/review').route(app, config);
require('./models/buybox').route(app, config);

http.listen(3030, function () {
	console.log("Listening on port 3030");
});
