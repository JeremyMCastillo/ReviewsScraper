const _ = require('lodash');

var route = (app) => {
	app.get('/config', (req, res) => {
		res.send("Hello");
	});
};

module.exports = {route};
