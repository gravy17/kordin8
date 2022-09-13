import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { AdminInstance } from "../models/admin";
import { adminValidator, adminUpdateValidator } from "../utils/admin";
import { loginValidator, validationOpts, generateToken } from "../utils/utils";
import { hash, compare } from "bcryptjs";

export async function getAdminInfo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.admin || req.admin !== id) {
      return res.status(403).json({
        message: "Not authorized to view this admin"
      });
    }

    const record = await AdminInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    return res.status(200).json({
      message: "Admin found",
      record
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: Failed to get admin info",
      id: req.params.id
    });
  }
}

export async function loginAdmin(req: Request, res: Response) {
  try {
    const validationResult = loginValidator.validate(req.body, validationOpts);
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message
      });
    }

    const { email, password } = req.body;
    const user = await AdminInstance.findOne({
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
          maxAge: 30 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
        .cookie("usertype", "admin", {
          maxAge: 30 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
        .json({
          id: user.getDataValue("id"),
          name: user.getDataValue("firstName"),
          type: "admin",
          message: "Admin successfully authenticated"
        });
    } else {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error: Failed to authenticate admin"
    });
  }
}

export async function logoutAdmin(req: Request, res: Response) {
  try {
    delete req.admin;
    return res
      .cookie("token", "", { expires: new Date(0) })
      .cookie("usertype", "", { expires: new Date(0) })
      .status(200)
      .json({ message: "Admin successfully logged out" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error while logging out admin"
    });
  }
}

export async function updateAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.admin || req.admin !== id) {
      return res.status(403).json({
        message: "Not authorized to register admin"
      });
    }

    const validationResult = adminUpdateValidator.validate(
      req.body,
      validationOpts
    );
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message
      });
    }

    const record = await AdminInstance.findOne({
      where: { id },
      attributes: ["id", "firstName", "lastName", "email", "phone", "address"]
    });
    if (!record) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    const updated = await record.update({
      ...req.body
    });
    res.status(200).json({
      message: "Admin info successfully updated",
      updated
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: Failed to update movie",
      id: req.params.id
    });
  }
}

export async function registerAdmin(req: Request, res: Response) {
  const id = uuidv4();
  try {
    if (!req.admin) {
      return res.status(403).json({
        message: "Not authorized to register admin"
      });
    }

    const validationResult = adminValidator.validate(req.body, validationOpts);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message
      });
    }

    const duplicateEmail = await AdminInstance.findOne({
      where: { email: req.body.email }
    });
    if (duplicateEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashed = await hash(req.body.password, 8);
    const record = await AdminInstance.create({
      ...req.body,
      id,
      password: hashed
    });
    if (record) {
      return res.status(201).json({
        message: "Admin successfully registered"
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to register admin"
    });
  }
}
