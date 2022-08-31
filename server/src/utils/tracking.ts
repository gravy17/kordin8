import Joi from "joi";

export const trackingValidator = Joi.object().keys({
  orderId: Joi.string().required(),
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string()
});

export const trackingUpdateValidator = Joi.object().keys({
  orderId: Joi.string(),
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string()
});
