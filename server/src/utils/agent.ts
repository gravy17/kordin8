import Joi from "joi";
import { validServices } from "./types/service";

const millisecondsin18Yrs = 18 * 365 * 24 * 60 * 60 * 1000;
const nowMinus18Yrs = new Date().getTime() - millisecondsin18Yrs;
export const agentValidator = Joi.object()
  .keys({
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    bvn: Joi.number().max(99999999999),
    dob: Joi.date().max(nowMinus18Yrs).required(),
    email: Joi.string().trim().lowercase().required(),
    phone: Joi.string().required(),
    address: Joi.string().trim().required(),
    govtIdRef: Joi.string().trim(),
    maxOrders: Joi.number().max(99),
    service: Joi.string()
      .valid(...validServices)
      .required(),
    password: Joi.string().min(8).max(30).required(),
    confirm_password: Joi.ref("password")
  })
  .with("password", "confirm_password");

export const agentUpdateValidator = Joi.object()
  .keys({
    lastName: Joi.string(),
    firstName: Joi.string(),
    bvn: Joi.number().max(99999999999),
    dob: Joi.date().max(nowMinus18Yrs),
    email: Joi.string().trim().lowercase(),
    phone: Joi.string(),
    address: Joi.string().trim(),
    govtIdRef: Joi.string().trim(),
    maxOrders: Joi.number().max(99),
    service: Joi.string().valid(...validServices),
    password: Joi.string().min(8).max(30),
    confirm_password: Joi.ref("password")
  })
  .with("password", "confirm_password");
