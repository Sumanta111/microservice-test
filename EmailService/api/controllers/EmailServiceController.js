/**
 * EmailServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var nodemailer = require('nodemailer');

module.exports = {
  sendEmail : async function(req,res) {
      if(!req.body.sender_email || !req.body.sender_name || !req.body.receiver_email || !req.body.subject || !req.body.text){
        return res.status(sails.HttpStatus.BAD_REQUEST).send({msg : 'Provide all the required parameters'});
      }
        let transport = nodemailer.createTransport({
            service:'gmail',
            secure : false,
            port : 25,
            auth : {
                user : req.body.sender_email,
                pass : process.env.EMAIL_PASS
            },
            tls : {
                rejectUnauthorized : false
            }
        });
        let HelperOptions = {
            from : `"${req.body.sender_name}" <${req.body.sender_email}`,
            to : req.body.receiver_email,
            subject : req.body.subject,
            text : req.body.text
        };

        try{
            var info = await transport.sendMail(HelperOptions);
        }catch(err){
            return res.serverError({
                msg : 'Email send Failed',
                error : err
            })
        }

        registerToDB(req,info,(data)=>{
            return res.ok({
                msg : 'Successully sent Email',
                // info : info,
                info : data
            })
        })
  }

};

registerToDB = async function (req,info,callback){
    let data = {
        to : req.body.receiver_email,
        from : req.body.sender_email,
        subject : req.body.subject,
        email_body : req.body.text,
        messageId : info.messageId
    };

    const emailToDB = await EmailService.create(data).fetch().intercept((err)=>{
        if(err) return res.serverError(err);
    });
    callback(emailToDB);
}
