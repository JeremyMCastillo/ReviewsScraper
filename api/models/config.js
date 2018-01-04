const _ = require('lodash');

var route = (app, config) => {
	app.get('/config', (req, res) => {
		res.send("Hello");
	});
};

module.exports = {route};
