# Advanced Lambda Template

**Setup:** Create a new npm project, run `npm install aws-sdk` if you haven't installed it globally

**Run:** `node run-local.js`

**Deploy:** .zip the files, don't include the `run-local.js` or `node_modules`

This lambda function is setup to act like an API. 
Hitting different routes and sending variables request types/data will point to different functions.

Features:
- Node v8
- Async/await
- Dynamo / S3
- Multiple files
- Common functions
- Local testing