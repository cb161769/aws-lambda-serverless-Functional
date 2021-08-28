const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/index');

const server = awsServerlessExpress.createServer(app);
/**
 * 
 * @param {`*`} event 
 * @param {*} context application Context
 * @returns 
 */
exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
}