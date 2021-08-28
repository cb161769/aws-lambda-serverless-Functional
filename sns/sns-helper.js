const AWS = require('aws-sdk')
const sns = new AWS.SNS()
const TOPIC_NAME = process.env.TOPIC_NAME;
const logger = require('../helpers/log/logsHelper');

module.exports.eventProducer = (event, context, callback) => {
  const functionArnCols = context.invokedFunctionArn.split(':')
  const region = functionArnCols[3]
  const accountId = functionArnCols[4]

  const params = {
    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
    TopicArn: `arn:aws:sns:${region}:${accountId}:${TOPIC_NAME}`
  }

  sns.publish(params, (error, data) => {
    if (error) {
      return callback(error)
    }
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Message successfully published to SNS topic "${TOPIC_NAME}"`
      }),
    })
  })
}

module.exports.eventConsumer =  (event, context, callback) => {
  // print out the event information on the console (so that we can see it in the CloudWatch logs)
  console.log(`I'm triggered by "eventProducer" through the SNS topic "${TOPIC_NAME}"`)
  console.log(`event:\n${JSON.stringify(event, null, 2)}`)
  return callback(null, {
    event: event
  })
}
module.exports.publishSNS = async function(params){
    if (typeof params === 'object') {
        const {sns} = require('../connections/connections');
       try {
        logger.log('info', `Requesting [publishSNS]`, {tags: 'publishSNS', additionalInfo: {operation: 'SNS',function:'publishSNS' }});
        return sns.publish(params).promise();
       } catch (error) {
        logger.log('error', `Requesting [publishSNS]`, {tags: 'publishSNS', additionalInfo: {operation: 'SNS',function:'publishSNS',error:error }});

       }
    }
    
}