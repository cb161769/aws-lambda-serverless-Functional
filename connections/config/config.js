module.exports.config = {
    region:{
        name: 'us-west-2'
    },
    sns:{
        accountId:"170095147869",
        topicName:'',
    },
    dynamoBB: {
        deviceReadings: {
            name:"deviceReadings"
        },
        userDevice:{
            name:"userDevice"
        },
        deviceTable:{
            name:"deviceTable"
        },
        fareConfiguration:{
            name:"fareConfiguration"
        },
        deviceConfiguration:{
            name:"deviceConfiguration"
        },
        userLogs:{
            name:"userLogs"
        },
        deviceConnection:{
            name:"DeviceConnection"
        }
    },    
    S3:{
        BucketName: "devicetable-datasheet-readings"
    },
    deviceName:'ArduinoDevice01',
    LogGroups:{
        Database:{
            LogGroupName:'/aws/lambda/aws-dynamodb-cognito-api-dev-hello',
            LogStreamName:'[Database]'
        },
    },
    Iot:{
        endpoint:"a3grg8s0qkek3y-ats.iot.us-west-2.amazonaws.com"
    }
}