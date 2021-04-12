const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = data => {
  const authSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).max(15).required().label('Password'),
    password_confirmation: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .label('Passwords')
      .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  });
  return authSchema.validate(data);
};

//Login Validation
const loginValidation = data => {
  const loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).max(15).required().label('Password'),
  });
  return loginSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
