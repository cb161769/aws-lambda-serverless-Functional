const logger = require('../helpers/log/logsHelper');
const {config} = require('../connections/config/config');
const {getYesterdayDate,getTodaysDate,getTodaysDateWithMoreMinutes,changeDates} = require('../functions/generalFunctions');
const deviceName = config.deviceName;
const {dynamoDBConnection} = require('../connections/connections');
const {AutomateConsumption} =require('../helpers/automation/atuomationHelper');
/**
 * @function fetchTodaysData
 * @author Claudio Raul Brito Mercedes
 * @returns data
 */
async function fetchTodaysData(){
    try {
        const dates = changeDates(15,15);
        const data = await dynamoDBConnection.query({
            TableName : config.dynamoBB.deviceReadings.name,
            KeyConditionExpression: '#key = :key and #sortKey BETWEEN :start AND :end',
            ScanIndexForward: true, // DESC order
            ConsistentRead: false,
            ExpressionAttributeNames:{
                '#key': 'primarykey',
                '#sortKey': 'sortkey',
            },
            ExpressionAttributeValues: {
                ':key':  config.deviceName,
                ':start': dates.initialDate,
                ':end': dates.finalDate,
            },
        }).promise();
        logger.log('info', `Requesting [fetchTodaysData]`, {tags: 'Method', additionalInfo: {operation: 'fetchYesterdaysData',databaseOperation:'GET', table: config.dynamoBB.deviceReadings.name }});

        return data.Items;
    } catch (error) {
        logger.log('error', `Requesting [fetchTodaysData]`, {tags: 'Method', additionalInfo: {operation: 'fetchYesterdaysData',databaseOperation:'GET',error:e, table: config.dynamoBB.deviceReadings.name }});
    }
};
async function fetchConfigurationData(){
    const fareConfigurations =         [{
        "deviceId": "ArduinoDevice01",
        "registeredAt": "4/5/2021",
        "updatedAt": "4/5/2021",
        "status": true,
    
     
        "configurationName": "Configuracion Uno",
        "day": {
            "type": "Buffer",
            "data": []
        },
        MaximumKilowattsPerMonth: "5000000",
        "connectionsConfigurations": [
            {
             connectionName:'Conexion 1',
             "isItDaily":true,
            "configurationMaximumKilowattsPerDay": "500000",
            configurationMaximumKilowattsPerWeek: "5000000",
            configurationMaximumKilowattsPerMonth: "5000000",
            isItWeekly:false,
            "configurationDays": [
                {
                    day: '',
                    
    
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '' 
                }
            ],
            isItMonthly:false,
            configurationMonths:[
                {
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: ''   
                },
                {
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '' 
                },
                {
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '' 
                },
                {
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '' 
                }
                ]   
            },
            {
                connectionName:'Conexion 1',
                "isItDaily":true,
               "configurationMaximumKilowattsPerDay": "500000",
               isItWeekly:false,
               "configurationDays": [
                   {
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '' 
                   }
               ],
               isItMonthly:false,
               configurationMonths:[
                   {
                   day: '',
                   day: '',
                   day: '',
                   day: '',
                   day: '',
                   day: '',
                   day: ''   
                   },
                   {
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '' 
                   },
                   {
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '' 
                   },
                   {
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '' 
                   }
                   ]   
               },
               {
                connectionName:'Conexion 1',
                "isItDaily":true,
               "configurationMaximumKilowattsPerDay": "500000",
               isItWeekly:false,
               "configurationDays": [
                   {
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '' 
                   }
               ],
               isItMonthly:false,
               configurationMonths:[
                   {
                   day: '',
                   day: '',
                   day: '',
                   day: '',
                   day: '',
                   day: '',
                   day: ''   
                   },
                   {
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '' 
                   },
                   {
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '' 
                   },
                   {
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '',
                       day: '' 
                   }
                   ]   
               },
               {
             connectionName:'Conexion 1',
             "isItDaily":true,
            "configurationMaximumKilowattsPerDay": "500000",
            isItWeekly:false,
            "configurationDays": [
                {
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '' 
                }
            ],
            isItMonthly:false,
            configurationMonths:[
                {
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: ''   
                },
                {
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '' 
                },
                {
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '' 
                },
                {
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '',
                    day: '' 
                }
                ]   
            }
        ],
        "configurationId": "8288668a-9cb5-4ed7-bec2-dd9d7566cc93",
        "isItDaily":true,
        "configurationMaximumKilowattsPerDay": "500000",
        isItWeekly:false,
        "configurationDays": [
            {
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: '' 
            }
        ],
        isItMonthly:false,
        configurationMonths:[
            {
             day: '',
             day: '',
             day: '',
             day: '',
             day: '',
             day: '',
             day: ''   
            },
            {
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: '' 
            },
            {
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: '' 
            },
            {
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: '',
                day: '' 
            }
        ]
    
    
    }];
    return fareConfigurations;
};
module.exports.handler = async (event, context,callback) =>{
    try {
        const data = await fetchTodaysData();
        console.log(data);
        const configuration = await fetchConfigurationData();
       const automation = await AutomateConsumption(data,configuration);
       console.log(automation);
        logger.log('info', `Requesting [automation-cron-job]`, {tags: 'automation-cron-job', additionalInfo: {operation: 'cron-job-handler', table: config.dynamoBB.deviceReadings.name }});
    } catch (error) {
        logger.log('error', `Requesting [automation-cron-job]`, {tags: 'automation-cron-job', additionalInfo: {operation: 'cron-job-handler',error:error, table: config.dynamoBB.deviceReadings.name }});   
    }
}