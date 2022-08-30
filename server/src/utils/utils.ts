import Joi from "joi";
import { sign } from "jsonwebtoken";

export const loginValidator = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().min(8).max(30).required()
});

export const validationOpts = {
  abortEarly: false,
  errors: {
    wrap: {
      label: ""
    }
  }
};

export const generateToken = (user: { [key: string]: unknown }): unknown => {
  try {
    const secret = process.env.JWT_SECRET as string;
    return sign(user, secret, { expiresIn: "7d" });
  } catch (err) {
    console.error(err);
  }
};
