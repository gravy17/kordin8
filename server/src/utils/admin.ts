import Joi from "joi";

export const adminValidator = Joi.object()
  .keys({
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    phone: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    password: Joi.string().min(8).max(30).required(),
    confirm_password: Joi.ref("password")
  })
  .with("password", "confirm_password");

export const adminUpdateValidator = Joi.object()
  .keys({
    lastName: Joi.string(),
    firstName: Joi.string(),
    email: Joi.string().trim().lowercase(),
    phone: Joi.string().trim(),
    address: Joi.string().trim(),
    password: Joi.string().min(8).max(30),
    confirm_password: Joi.ref("password")
  })
  .with("password", "confirm_password");
