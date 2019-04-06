/* run the lambda wrapper locally*/
var runlocal = require("./index.js");


runlocal.mwbrightcoveanalytics ({
  "resource": "/{proxy+}",
"path": "/edgetv.m3u8",
  "httpMethod": "GET",
  "headers": {
    "Accept": "*/*",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "Origin": "origin.com",
    "CloudFront-Viewer-Country": "NZ",
    "Host": "j4vse2rfxk.execute-api.ap-southeast-2.amazonaws.com",
    "User-Agent": "curl/7.43.0",
    "Via": "1.1 52fa979688e0f35a0eb1bdd9ab7c7fe4.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "bppHlgwTAlrHR6Ov1oAT0mO6e5q_RRYiFegEmdeiL3sRu-SsChfvUA==",
    "X-Amzn-Trace-Id": "Root=1-59a89bba-0a47086a1dc0ea997a95fb3b",
    "X-Forwarded-For": "210.54.35.209, 54.239.202.88",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  "queryStringParameters": {
    "__amp_source_origin": "http://www.newshubx.co.nz"
  },
  "pathParameters": {
    "proxy": "news-header.json"
  },
  "stageVariables": null,
  "requestContext": {
    "path": "/test/news-header.json",
    "accountId": "136135465816",
    "resourceId": "fgm7kh",
    "stage": "test",
    "requestId": "29becbb1-8ea4-11e7-ae92-5fddf9944af4",
    "identity": {
      "cognitoIdentityPoolId": null,
      "accountId": null,
      "cognitoIdentityId": null,
      "caller": null,
      "apiKey": "",
      "sourceIp": "210.54.35.209",
      "accessKey": null,
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": null,
      "userAgent": "curl/7.43.0",
      "user": null
    },
    "resourcePath": "/{proxy+}",
    "httpMethod": "GET",
    "apiId": "j4vse2rfxk"
  },
  "body": null,
  "isBase64Encoded": false
}
, 'boo',printout)

function printout (err, data) {
	console.log (err,data)
}

