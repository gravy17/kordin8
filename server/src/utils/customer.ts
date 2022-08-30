import Joi from "joi";

export const customerValidator = Joi.object()
  .keys({
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    phone: Joi.string(),
    password: Joi.string().min(8).max(30).required(),
    confirm_password: Joi.ref("password")
  })
  .with("password", "confirm_password");

export const customerUpdateValidator = Joi.object()
  .keys({
    lastName: Joi.string(),
    firstName: Joi.string(),
    email: Joi.string().trim().lowercase(),
    phone: Joi.string(),
    password: Joi.string().min(8).max(30),
    confirm_password: Joi.ref("password")
  })
  .with("password", "confirm_password");
