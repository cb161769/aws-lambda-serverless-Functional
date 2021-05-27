module.exports.config = {
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
}