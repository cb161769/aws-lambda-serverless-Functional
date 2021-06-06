const AWS = require('aws-sdk');
const logger = require('../log/logsHelper');
const config = require('../../connections/config/config');
const iotData = new AWS.IotData({
    endpoint: config.config.Iot.endpoint,
});
/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} endpoint device endpoint
 * @param {*} topic device topic
 * @param {*} payload device payload
 * @returns promise
 */
module.exports.publishTopic = async function( topic, payload) {
    try {
     
        const params = {
            topic: topic,
            payload: payload,
            qos:0
        }
        return  iotData.publish(params, (err,data) =>{
            if (err) {
                logger.log('error', `Requesting `, {tags: 'IOT-PUBLISH', additionalInfo: {operation: 'publishTopic',error:err }});
                
            }
            logger.log('info', `Requesting `, {tags: 'IOT-PUBLISH', additionalInfo: {operation: 'publishTopic',succes:true }});
        })
    } catch (error) {
        logger.log('error', `Requesting `, {tags: 'IOT-PUBLISH', additionalInfo: {operation: 'publishTopic',error:error }});
    }

};