/**
 * EmailService.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    to : {
      type : 'string',
      required : true
    },
    from : {
      type : 'string',
      required : true
    },
    subject : {
      type : 'string',
      required : true
    },
    email_body : {
      type : 'text',
      required : true
    },
    messageId : {
      type : 'string',
      required : true
    },
  },

};

