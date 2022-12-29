const Joi = require('@hapi/joi');
const messages = require('../constants/messages');
const { tickets } = require('./shared-schema');

const kafkaMessageValidation = {
  /**
  * Validate schema for pending/reserved/cancelled ticket
  * @return null if validation passes otherwise a validation error
  */
  kafkaMessage(reservation) {
    var schema = Joi.object().keys({
      meta: Joi.object().keys({
        action: Joi.string().valid(messages.TICKET_RESERVED, messages.TICKET_PENDING, messages.TICKET_CANCELLED).required(),
      }).unknown(false),
      body: Joi.object().keys({
        matchNumber: Joi.number().required(),
        tickets,
      }).unknown(false),
    }).required();
    return schema.validate(reservation).error;
  },
};

module.exports = kafkaMessageValidation;