import Joi from "joi";
import { validServices } from "./types/service";
import { validStatuses } from "./types/status";

export const orderValidator = Joi.object().keys({
  orderType: Joi.string()
    .valid(...validServices)
    .required(),
  recipient: Joi.string(),
  description: Joi.string(),
  price: Joi.number().required()
});

export const orderUpdateValidator = Joi.object().keys({
  orderType: Joi.string().valid(...validServices),
  recipient: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  status: Joi.string().valid(...validStatuses),
  agent: Joi.string()
});
