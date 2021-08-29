module.exports.config = {
    region:{
        name: 'us-west-2'
    },
    sns:{
        accountId:"",
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
        },
        relaysConfiguration:{
            name:"relaysConfiguration"
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
    },
    encryption:{
        password:'1234'
    },
    Firebase:{
        registrationToken:''
    },
    userNameEmail:{
        email: 'claudioraulmercedes@gmail.com',
    }
}