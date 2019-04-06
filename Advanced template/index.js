/**
 * This is the main Lambda file that is invoked and contains the handler function
 */

const dynamo = require('./dynamo');
const common = require('./common');

// debugging node environment variable
const DEBUG_ENABLED = (process.env.debug_enabled === 'true') ? true : false;

const DATABASE_TABLE = 'ENTER_TABLE_NAME';

const FAILURE_QUERY = "Database query failure";
const FAILURE_USER = "User data is missing";
const FAILURE_NO_ID = "No user ID was passed in the headers";


exports.handler = async function(event, context, callback) {

    if (DEBUG_ENABLED) { console.log(`[DEBUG] Event: ${JSON.stringify(event)}`) }
    
	let route = "";
    let output;

    // get the route parameter as string
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (common.isPopulated(event.pathParameters.endpoint)) {
            route = event.pathParameters.endpoint;
        }
    }
    
    // set the default database params (TableName)
    let params = { TableName : DATABASE_TABLE };

    switch (route) {

        case 'view_all': // [GET] /view_all route

            // if there is a sortBy header present
            const sortBy = event.headers.sortBy ? event.headers.sortBy : null;
            const filter = event.headers.sortBy ? event.headers.filter : null;
            // ^ filters: emptyObjects, emptyVariables

            output = await dynamo.scan(params, true);

            if (output && common.isJsonString(output)) {
                endLambda(common.formatJsonData(output, filter));
            } else {
                errorEndLambda(FAILURE_QUERY);
            }

            break;


        case 'view_database_summary':

            output = await dynamo.scan(params, true);

            if (output) {
                endLambda(common.getDataSummary(output));
            } else {
                errorEndLambda(FAILURE_QUERY);
            }
            
            break;


        case 'view_record':

            params.Key = { ID : event.pathParameters.ID };

            output = await dynamo.get(params);

            if (common.validResponse(output)) {
                endLambda(output);
            } else {
                errorEndLambda(FAILURE_QUERY, output);
            }

            break;


        case 'backup_database': // gets all data from the database, JSON stringifys it, then pushes to a database
                
            output = await dynamo.scan(params, true);

            if (output && common.isJsonString(output)) {

                const AWS = require('aws-sdk');
                const S3 = new AWS.S3();
            
                params = {
                    Key: `database_backups/${common.getTimeStamp()}`,
                    Bucket: 'BUCKET_NAME',
                    ContentType: "application/json",
                    Body: JSON.stringify(output)
                };
            
                // upload the file to S3!
                S3.upload(params, function(error, data) {
                    if (error) {
                        errorEndLambda("S3 upload failure", error);
                    } else {
                        endLambda(`Successfully uploaded!\n - Bucket: ${data.Bucket}\n - File: ${data.key}\n - Location: ${decodeURI(data.Location)}`);
                    }
                });

            } else {
                errorEndLambda(FAILURE_QUERY);
            }
            
            break;

            
        default:
			endLambda("Unable to connect to server");
    }
    
    
	// END THE LAMBDA!
	function endLambda(responseBody) {
	    
	    // create the response object based on the output param (string)
        const responseObj = {
            "statusCode": "200",
            "body": responseBody,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        };
	    
		callback(null, responseObj);
    }


    // set error data then END LAMBDA!
    function errorEndLambda(message, ...args) {
        
        const baseString = `[ERROR] in /${route}: ${message}`;

        // TODO: handle the ...args - either console.log or add to response object? might need to make it a Json format or something

        endLambda(baseString, ...args);
    }
    

};
