/**
 * PushNotificationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    sendPush : function(req,res) {
        if(!req.body.registrationToken || !req.body.title || !req.body.text || !req.body.click_action || !req.body.icon){
            return res.status(sails.HttpStatus.BAD_REQUEST).send({msg : 'Provide all the required parameters'});
          }
        var registrationToken = req.body.registrationToken;
        var payload = {
            notification: {
                title: req.body.title,
                body: req.body.text,
                click_action: req.body.click_action,
                icon: req.body.icon
            },
        };
        var options = {
            priority : 'high',
            timeTolive : 60*60*24
        }

        sails.admin.messaging().sendToDevice(registrationToken,payload,options).then((response)=>{
            res.ok({
                msg : 'Successully sent Push Message',
                response : response
            })
        }).catch(err => {
            res.serverError({
                msg : 'Error sending Push',
                response : err
            })
        })
    }

};

