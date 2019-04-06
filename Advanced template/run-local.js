'use strict';

const lambda = require('./index');

const requestObject = {
    runLocal: true, // just for local use! - To differ between lambda and running locally
    pathParameters: {
        endpoint: 'view_record'
    },
    queryStringParameters: {
        id: "1000",
        version: "2.0.0",
        highest_level: "20",
        device_system: "iOS",
        device_type: "iPhone X",
        tester: "true"
    },
    resource: '/testFunction/{endpoint}',
    path: '/testFunction/bla',
    httpMethod: 'GET',
    headers: {
        // CUSTOM HEADERS
        'sortBy' : 'ID',
        'filter' : 'emptyObjects',
        // standard AWS headers
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        Host: '51ji5p1i31.execute-api.ap-southeast-2.amazonaws.com',
        'upgrade-insecure-requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'X-Amzn-Trace-Id': 'Root=1-5b7e64cf-ad721fa4bb6a40e42f78d958',
        'X-Forwarded-For': '122.58.128.87',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https',
    },
    stageVariables: null,
    requestContext: {
        resourceId: 'qbrggh',
        resourcePath: '/testFunction/{endpoint}',
        httpMethod: 'GET',
        extendedRequestId: 'MESwWFqkSwMFSgQ=',
        requestTime: '23/Aug/2018:07:39:59 +0000',
        path: '/Test/testFunction/bla',
        accountId: '793861092533',
        protocol: 'HTTP/1.1',
        stage: 'Test',
        requestTimeEpoch: 1535009999073,
        requestId: 'bcb815f4-a6a7-11e8-b9cc-2b17570355b1',
        identity: {
            cognitoIdentityPoolId: null,
            accountId: null,
            cognitoIdentityId: null,
            caller: null,
            sourceIp: '122.58.128.87',
            accessKey: null,
            cognitoAuthenticationType: null,
            cognitoAuthenticationProvider: null,
            userArn: null,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
            user: null
        },
        apiId: '51ji5p1i31'
    },
    body: null,
    isBase64Encoded: false
}


// call the lambda function!
lambda.handler(requestObject, null, printout);


// print the lambda function output!
function printout (err, data) {
	console.log (err, data.body)
}
