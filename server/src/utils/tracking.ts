import Joi from "joi";

export const trackingValidator = Joi.object().keys({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string()
});
