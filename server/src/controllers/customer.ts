import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { CustomerInstance } from "../models/customer";
import { loginValidator, validationOpts, generateToken } from "../utils/utils";
import { customerValidator, customerUpdateValidator } from "../utils/customer";
import { hash, compare } from "bcryptjs";
import { RequestInstance } from "../models/requests";
import { OrderInstance } from "../models/order";
import { AgentInstance } from "../models/agent";

export async function getCustomerInfo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.admin && req.customer !== id) {
      return res.status(403).json({
        message: "Not authorized to view this customer"
      });
    }

    const record = await CustomerInstance.findOne({
      where: { id },
      attributes: {
        exclude: ["password"]
      },
      include: [
        {
          model: OrderInstance,
          as: "orders",
          include: [
            {
              model: AgentInstance,
              as: "assignedAgent",
              attributes: ["firstName", "phone"]
            }
          ]
        }
      ]
    });
    if (!record) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    return res.status(200).json({
      message: "Customer found",
      record
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: Failed to get customer info",
      id: req.params.id
    });
  }
}

export async function loginCustomer(req: Request, res: Response) {
  try {
    const validationResult = loginValidator.validate(req.body, validationOpts);
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message
      });
    }

    const { email, password } = req.body;
    const user = await CustomerInstance.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    const hash = user.getDataValue("password");
    const valid = await compare(password, hash);
    if (valid) {
      const id = user.getDataValue("id");
      const token = generateToken({ id });
      return res
        .status(200)
        .cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
        .cookie("usertype", "customer", {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
        .json({
          id: user.getDataValue("id"),
          name: user.getDataValue("firstName"),
          type: "customer",
          message: "Customer successfully authenticated"
        });
    } else {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error: Failed to authenticate customer"
    });
  }
}

export async function logoutCustomer(req: Request, res: Response) {
  try {
    delete req.customer;
    return res
      .cookie("token", "", { expires: new Date(0) })
      .cookie("usertype", "", { expires: new Date(0) })
      .status(200)
      .json({ message: "Customer successfully logged out" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error while logging out customer"
    });
  }
}

export async function updateCustomer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.customer || req.customer !== id) {
      return res.status(403).json({
        message: "Not authorized to update customer"
      });
    }

    const validationResult = customerUpdateValidator.validate(
      req.body,
      validationOpts
    );
    console.log(validationResult.error);
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message
      });
    }

    const record = await CustomerInstance.findOne({
      where: { id },
      attributes: ["id", "firstName", "lastName", "email", "phone"]
    });
    if (!record) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    const updated = await record.update({
      ...req.body
    });
    res.status(200).json({
      message: "Customer info successfully updated",
      updated
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: Failed to update customer",
      id: req.params.id
    });
  }
}

export async function registerCustomer(req: Request, res: Response) {
  const id = uuidv4();
  try {
    const validationResult = customerValidator.validate(
      req.body,
      validationOpts
    );
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message
      });
    }

    const duplicateEmail = await CustomerInstance.findOne({
      where: { email: req.body.email }
    });
    if (duplicateEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashed = await hash(req.body.password, 8);
    const record = await CustomerInstance.create({
      ...req.body,
      id,
      password: hashed
    });
    console.log("After");
    console.log(req.body);
    if (record) {
      return res.status(201).json({
        id,
        message: "Customer successfully registered"
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to register customer"
    });
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.admin) {
      return res.status(403).json({
        message: "Not authorized to delete customer"
      });
    }

    const record = await CustomerInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    const deleted = await CustomerInstance.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({
        id,
        message: "Customer successfully deleted"
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: Failed to delete customer"
    });
  }
}

export async function requestDeletion(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.customer || req.customer !== id) {
      return res.status(403).json({
        message: "Not authorized to request deletion"
      });
    }

    const record = await CustomerInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    const request = await RequestInstance.create({
      id,
      user: "customer",
      requestType: "delete",
      reason: req.body.reason
    });

    if (request) {
      return res.status(200).json({
        request,
        message: "Request successfully sent"
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: Failed to request customer deletion"
    });
  }
}
