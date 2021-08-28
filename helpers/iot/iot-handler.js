var AWS = require('aws-sdk');
var iotdata = new AWS.IotData({endpoint: 'a3grg8s0qkek3y-ats.iot.us-west-2.amazonaws.com'});
module.exports.handler = async (event, context) => {
  
  var params = {
       topic: '/turnOffDeviceOne',
       payload: '',
       qos: 0
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(await publishMessage(params))
  }
}
const publishMessage = async (params) => {
  return new Promise((resolve, reject) => {
    iotdata.publish(params, function(err, data){
      if(err){
        console.log(err);
        reject(err)
      }
      else{
        console.log("success?");
        resolve(params)
      }
    })
  })
}