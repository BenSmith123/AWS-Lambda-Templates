/**
 * This file handles all async dynamo functions
 */

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

// debugging node environment variable
const DEBUG_ENABLED = (process.env.debug_enabled === 'true') ? true : false;

// scan entire database
async function scan(params, noStringify) {
	
	return new Promise((resolve, reject) => {
	
	    documentClient.scan(params, function(err, data) {
    		if (err) {
				if (DEBUG_ENABLED) { console.log('[ERROR]', err) } // console log the error if debugging is enabled
    			resolve(err);
    		} else {
				if (noStringify) {
					resolve(data);
				} else {
					resolve(JSON.stringify(data));
				}
    		}
    	});

	});
}


// query database for single record
async function get(params) {
	
	return new Promise((resolve, reject) => {
	
	    documentClient.get(params, function(err, data) {
    		if (err) {
				if (DEBUG_ENABLED) { console.log('[ERROR]', err) } // console log the error if debugging is enabled
    			resolve(err);
    		} else {
    			resolve(JSON.stringify(data));
    		}
    	});

	});
}


// put item into database
async function put(params) {
	
	return new Promise((resolve, reject) => {
	
	    documentClient.put(params, function(err, data) {
    		if (err) {
				if (DEBUG_ENABLED) { console.log('[ERROR]', err) } // console log the error if debugging is enabled
    			resolve(err);
    		} else {
    			resolve(data);
    		}
    	});

	});
}


module.exports = {
	scan,
	get,
	put
};