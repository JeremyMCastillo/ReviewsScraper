const _ = require('lodash');

var route = (app, config) => {
	app.get('/buybox', (req, res) => {
		res.send("Hello");
    });
    
    app.get('/buybox/:asin', (req, res) => {
        var asin = req.params.asin;

        var asinComponents = asin.split('');
        if(asinComponents.length != 10){
            res.status(400).send("Input does not seem to be a proper ASIN.");
        }
        else {
            
            res.send(asin);
        }
    });
};

module.exports = {route};
