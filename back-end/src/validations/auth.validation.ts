import Joi from 'joi';
import { password } from './custom.validation';

const registerValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    type: Joi.string().required().valid('user', 'flight'),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logoutValidation = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export { registerValidation, loginValidation, logoutValidation };
