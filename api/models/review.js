const _ = require('lodash');
const fs = require('fs-extra');
const csv = require('csvtojson');

var route = (app, config) => {
	app.get('/review', (req, res) => {
		res.send("Hello");
    });
    
    app.get('/review/:asin', (req, res) => {
        var asin = req.params.asin;

        var asinComponents = asin.split('');
        if(asinComponents.length != 10){
            res.status(400).send("Input does not seem to be a proper ASIN.");
        }
        else {
            // Check if ASIN has been marked for download.
            // If not, add the necessary trigger file.
            var asinBase = asinComponents.join('/');
            var asinTrigger = asinBase + ".trigger";
            var asinReview = asinBase + ".csv";
            fs.pathExists(asinTrigger).then(exists => {
                // Trigger doesn't exist, create it and notify that it will be parsed later. 
                if(!exists){
                    fs.ensureFile(asinTrigger, err => {
                        if(err){
                            throw new Error(err);
                        } else {
                            res.status(204).send('ASIN: ' + asin + ' will be parsed at a later time.');
                        }
                    });
                } else {
                    // Trigger exists, check for review
                    return fs.pathExists(asinReview);
                }
            }).then(exists => {
                // No review yet, carry on. 
                if(!exists){
                    res.status(204).send('ASIN: ' + asin + ' has not been parsed yet');
                } else {
                    // There's some review data, parse it and send it back to the client. 
                    var result = {};
                    csv()
                        .fromFile(asinReview)
                        .on('json', (jsonObj) => { // Fires for every row of the CSV. This block will get the last row, or the latest review. 
                            result = jsonObj;
                        })
                        .on('done', (error) => {
                            throw new Error('Could not read the file: ' + asinReview);
                        });
                    var reviewAverage = result.ratingAverage;
                    res.send(reviewAverage);
                }
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    });
};

module.exports = {route};
