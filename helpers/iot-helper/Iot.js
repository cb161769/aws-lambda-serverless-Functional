const AWS = require('aws-sdk');
/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} endpoint device endpoint
 * @param {*} topic device topic
 * @param {*} payload device payload
 * @returns promise
 */
module.exports.publishTopic = async function(endpoint, topic, payload) {
    const iotData = new AWS.IotData({
        endpoint: endpoint,
    });
    return await iotData.publish({
        topic: topic,
        payload: payload,
        qos:0
    }).promise();
};