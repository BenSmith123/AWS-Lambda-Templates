'use strict';

// lambda function! (if you change the function name or filename remember to change it in the lambda console)
// the function does not have to be async
exports.handler = async (event, context, callback) => { // don't have to use all parameters aren't always required
    
    let route = "";
    let output;

    // get the route parameter as string
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.endpoint !== undefined &&
            event.pathParameters.endpoint !== null &&
            event.pathParameters.endpoint !== "") {
            route = event.pathParameters.endpoint;
        }
    }

    switch (route) {

        case 'database':
            const database = require("./database");
            output = await database.getUserRecords();
            break;

        case 'blabla':

            output = "You've hit the /blabla route!";
            break;
            

        default:
            output = "no endpoint path found :(";
    }


    // create the response object based on the output param (string)
    // the lambda will only output the response.body
    const responseObj = {
        "statusCode": "200", // if the code hasn't already handled errors then DON'T just use this hardcoded response successful
        "body": output,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    }

    callback(null, responseObj); // end the lambda!
    
};
