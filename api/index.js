var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const http = require('http').Server(app);
app.use(bodyParser.json());

// Routes for API Objects
require('./models/config').route(app);

http.listen(3030, function () {
	console.log("Listening on port 3030");
});
