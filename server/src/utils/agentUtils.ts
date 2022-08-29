import Joi from "joi";
import jwt from "jsonwebtoken";

export const agentKycSchema = Joi.object().keys({
  lastName: Joi.string().lowercase().required(),
  firstName: Joi.string().lowercase().required(),
  bvn: Joi.string().required(),
  dob: Joi.date().max("1-1-2004").raw().required(),
  // dob: Joi.date().format('YYYY-MM-DD').options({ convert: false }).required(),
  email: Joi.string().trim().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
  govtIdRef: Joi.string().required(),
  service: Joi.string().required(),
  maxOrders: Joi.number().required()
});

export const updateAgentSchema = Joi.object().keys({
  lastName: Joi.string().lowercase().required(),
  firstName: Joi.string().lowercase().required(),
  bvn: Joi.string().required(),
  dob: Joi.date().max("1-1-2004").raw().required(),
  // dob: Joi.date().format('YYYY-MM-DD').options({ convert: false }).required(),
  email: Joi.string().trim().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
  govtIdRef: Joi.string().required()
});

export const registerAgentSchema = Joi.object()
  .keys({
    astName: Joi.string().lowercase().required(),
    firstName: Joi.string().lowercase().required(),
    bvn: Joi.string().length(11).required(),
    dob: Joi.date().max("1-1-2004").raw().required(),
    email: Joi.string().trim().lowercase().required(),
    phoneNumber: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    confirm_password: Joi.ref("password")
  })
  .with("password", "confirm_password");

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
});

export const generateToken = (agent: { [key: string]: unknown }): unknown => {
  const pass = (process.env.JWT_SECRET as string) || ("SECRET" as string);
  return jwt.sign(agent, pass, { expiresIn: "1d" });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: ""
    }
  }
};
