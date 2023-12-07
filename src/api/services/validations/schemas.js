const Joi = require('joi');

const registerUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
  image: Joi.optional(),
});

const categoryInputSchema = Joi.object({
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const newPostSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
});

const updatedPostSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
});

module.exports = {
  registerUserSchema,
  categoryInputSchema,
  loginSchema,
  newPostSchema,
  updatedPostSchema,
};
