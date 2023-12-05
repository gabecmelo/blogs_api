const Joi = require('joi');

const registerUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
  image: Joi.optional(),
});

module.exports = {
  registerUserSchema,
};
