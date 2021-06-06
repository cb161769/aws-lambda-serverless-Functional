const AWS = require('aws-sdk');
const {config} = require('../../connections/config/config');
const iotData = new AWS.IotData({endpoint: config.Iot.endpoint});
const logger = require('../../helpers/log/logsHelper');
module.exports.handler = async (event, context, callback) => {
  const iotParams = {
    topic: '/turnOffDeviceOne',        
	  payload: 'compay',        
	  qos: 0
  }

  iotData.publish(iotParams, function(err,data){
    if(err){
      logger.log('error', ``, {tags: 'IOT', additionalInfo: {operation: 'publish', error:err,databaseOperation:'GET'  }});
    }

  });
  callback(null,{success:true});
}