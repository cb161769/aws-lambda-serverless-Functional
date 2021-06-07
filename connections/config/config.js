module.exports.config = {
    region:{
        name: 'us-west-2'
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