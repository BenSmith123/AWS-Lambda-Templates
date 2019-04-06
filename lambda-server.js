const http = require('http');
const url = require('url');

/**
 * This sets up a server to listen to requests and pass the requests to the lambda function in the same format that cloudfront/API gateway would
 * 
 * This does not invoke the lambda function and pass in a preconfigured object, this invokes the lambda function based on an incoming request
 * e.g. you can use this to live test how your project will interact with lambda locally
 */

const lambda = require('./Advanced template/index'); // pick which lambda to use

http.createServer(async function (req, res) {
   
    // MOCK LAMBDA REQUEST - Look at the incoming request object and format it to how lambda would interpret the incoming event
    const requestObject = {
        body: req.body || null,
        domain: req.domain,
        headers: req.headers,
        httpMethod: req.method,
        path: req.url,
        pathParameters: { endpoint: null }, // NOTE: the key (endpoint) can only be configured via API gateway (api gateway can map key's to values from a path - /shows/{showId})
        queryStringParameters: url.parse(req.url, true).query
    }

    // extract path parameter - e.g: [GET] localhost:8081/blabla
    if (requestObject.path.indexOf('?') !== -1 ) {
        requestObject.pathParameters.endpoint = requestObject.path.slice(1, requestObject.path.indexOf('?')); // remove trailing query string params
    } else {
        requestObject.pathParameters.endpoint = requestObject.path.slice(1, requestObject.path.length+1);
    }

    await lambda.handler(requestObject, null, callback)
    
    function callback(err, data) {
        res.writeHead(200, {'Content-Type': 'text/plain'}); // write default success header
        res.end(data.body);
    }

}).listen(8081);

// Console will print the message
console.log('[READY] Local lambda is awaiting a request on localhost:8081');

