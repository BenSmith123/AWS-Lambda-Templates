var request = require('request');
var AWS = require('aws-sdk');

/**
 * this is a very simple example of a lambda function - run locally
 */

if (process.env.AWS_ACCESS_KEY_ID == null) {
  var credentials = new AWS.SharedIniFileCredentials({profile: 'mediaworks’});
  AWS.config.credentials = credentials;
};


exports.mw_example_lambda = function(event, context, callback) {

//Setup S3
var s3 = new AWS.S3();

function outputtohttpclient (err, res ,contenttype) { 
      callback(null, {
        "statusCode": err ? "400" :  "200",
        "body": err ? err.message : res ,
        "headers": {
            "Content-Type": contenttype ? contenttype : "application/json"
        },
    });
  }



/* START */
//Do the thing


};
