import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AdminInstance } from "../models/admin";
import { CustomerInstance } from "../models/customer";
import { AgentInstance } from "../models/agent";

const secret = (process.env.JWT_SECRET as string) || "secret";

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization && !req.cookies.token) {
      return res
        .status(401)
        .json({ message: "Authentication required. Please login" });
    }

    const token =
      authorization?.slice(7, authorization.length) ||
      (req.cookies.token as string);
    let verified = verify(token, secret);
    if (!verified) {
      return res
        .status(401)
        .json({ message: "Token expired/invalid. Please login" });
    }

    const { id } = verified as { [key: string]: string };

    const usertype = req.cookies.usertype as string;
    switch (usertype) {
      case "admin":
        const admin = await AdminInstance.findByPk(id);
        if (!admin) {
          return res
            .status(401)
            .json({ message: "Admin not found. Please login" });
        }
        req.admin = admin.getDataValue("id");
        break;
      case "customer":
        const customer = await CustomerInstance.findByPk(id);
        if (!customer) {
          return res
            .status(401)
            .json({ message: "Customer not found. Please login" });
        }
        req.customer = customer.getDataValue("id");
        break;
      case "agent":
        const agent = await AgentInstance.findByPk(id);
        if (!agent) {
          return res
            .status(401)
            .json({ message: "Agent not found. Please login" });
        }
        req.agent = agent.getDataValue("id");
        break;
      default:
        return res
          .status(401)
          .json({ message: "Not authorized. Please login" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "User not logged in" });
  }
}
