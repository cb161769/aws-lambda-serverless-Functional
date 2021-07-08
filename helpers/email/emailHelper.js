const config = require('../../connections/config/config');
const {ses} = require('../../connections/connections');
const emailConfig = require('../../connections/config/emailtemplate.config');
const logger = require('../log/logsHelper');
/**
 * @function sendEmail
 * @author Claudio Raul Brito Mercedes
 * @description this function sends an email to its destiny
 * @param templateData
 */
module.exports.sendEmail = async function(templateData){
    const template  = module.exports.createTemplate();
    const params = {
        Template: templateName,
        Destination: { 
          ToAddresses: [
            emailConfig.emailConfig.userEmail
          ]
        },
        Source: emailConfig.emailConfig.SESDomain,
        TemplateData: JSON.stringify(templateData || {})
      };
      ses.sendTemplatedEmail(params,(err,data)=>{
        if (err) {
            logger.log('error', `Requesting [sendEmail]`, {tags: 'emailHelper', additionalInfo: {operation: 'sendEmail',error:err }});
          }else{
            logger.log('error', `Requesting [sendEmail]`, {tags: 'sendEmail', additionalInfo: {operation: 'sendEmail' }});
          }
      })
}
/**
 * @function createTemplate
 * @author Claudio Raul Brito Mercedes
 * @description this function creates a EmailTemplate that will be sent to the client;
 */
module.exports.createTemplate = async function(){
     var params = {
        Template: { 
            TemplateName: emailConfig.emailConfig.templateName, 
            HtmlPart: emailConfig.emailConfig.HtmlPart,
            SubjectPart: emailConfig.emailConfig.Subject      
          }
     };
     ses.createTemplate(params,(err,data)=>{
         if(err){
            logger.log('error', `Requesting [createTemplate]`, {tags: 'emailHelper', additionalInfo: {operation: 'CreateTemplate',error:err }});
         }else{
            logger.log('error', `Requesting [createTemplate]`, {tags: 'emailHelper', additionalInfo: {operation: 'CreateTemplate' }});
         }
     });
}