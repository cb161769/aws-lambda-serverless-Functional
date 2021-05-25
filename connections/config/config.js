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
        test:{
            
        }
    },
    S3:{
        BucketName: "devicetable-datasheet-readings"
    },
    deviceName:'ArduinoDevice01'
};