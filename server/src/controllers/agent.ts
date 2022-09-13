import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { AgentInstance } from "../models/agent";
import { loginValidator, validationOpts, generateToken } from "../utils/utils";
import { agentValidator, agentUpdateValidator } from "../utils/agent";
import { hash, compare } from "bcryptjs";
import { RequestInstance } from "../models/requests";
import { OrderInstance } from "../models/order";

export async function getAgents(req: Request, res: Response) {
  try {
    if (!req.admin) {
      return res.status(403).json({
        message: "Not permitted to access this resource"
      });
    }
    const agents = await AgentInstance.findAll({
      attributes: ["id", "firstName", "lastName", "email", "phone", "service"]
    });
    res.status(200).json(agents);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getAgentInfo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.admin && req.agent !== id) {
      return res.status(403).json({
        message: "Not authorized to view this agent"
      });
    }

    const record = await AgentInstance.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "bvn", "govtIdRef"]
      },
      include: [
        {
          model: OrderInstance,
          as: "orders"
        }
      ]
    });
    if (!record) {
      return res.status(404).json({
        message: "Agent not found"
      });
    }

    return res.status(200).json({
      message: "Agent found",
      record
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: Failed to get agent info",
      id: req.params.id
    });
  }
}

export async function loginAgent(req: Request, res: Response) {
  try {
    const validationResult = loginValidator.validate(req.body, validationOpts);
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message
      });
    }

    const { email, password } = req.body;
    const user = await AgentInstance.findOne({
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
        .cookie("usertype", "agent", {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
        .json({
          id: user.getDataValue("id"),
          name: user.getDataValue("firstName"),
          type: "agent",
          message: "Agent successfully authenticated"
        });
    } else {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error: Failed to authenticate agent"
    });
  }
}

export async function logoutAgent(req: Request, res: Response) {
  try {
    delete req.agent;
    return res
      .cookie("token", "", { expires: new Date(0) })
      .cookie("usertype", "", { expires: new Date(0) })
      .status(200)
      .json({ message: "Agent successfully logged out" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error while logging out agent"
    });
  }
}

export async function updateAgent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.agent || req.agent !== id) {
      return res.status(403).json({
        message: "Not authorized to update agent"
      });
    }

    const validationResult = agentUpdateValidator.validate(
      req.body,
      validationOpts
    );
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message
      });
    }

    const record = await AgentInstance.findOne({
      where: { id },
      attributes: ["id", "firstName", "lastName", "email", "phone", "address"]
    });
    if (!record) {
      return res.status(404).json({
        message: "Agent not found"
      });
    }

    const updated = await record.update({
      ...req.body
    });
    res.status(200).json({
      message: "Agent info successfully updated",
      updated
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: Failed to update agent",
      id: req.params.id
    });
  }
}

export async function registerAgent(req: Request, res: Response) {
  const id = uuidv4();
  try {
    const validationResult = agentValidator.validate(req.body, validationOpts);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message
      });
    }

    const duplicateEmail = await AgentInstance.findOne({
      where: { email: req.body.email }
    });
    if (duplicateEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashed = await hash(req.body.password, 8);
    const record = await AgentInstance.create({
      ...req.body,
      id,
      password: hashed
    });
    if (record) {
      return res.status(201).json({
        id,
        message: "Agent successfully registered"
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to register agent"
    });
  }
}

export async function deleteAgent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.admin) {
      return res.status(403).json({
        message: "Not authorized to delete agent"
      });
    }

    const record = await AgentInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Agent not found"
      });
    }

    const deleted = await AgentInstance.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({
        id,
        message: "Agent successfully deleted"
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: Failed to delete agent"
    });
  }
}

export async function requestDeletion(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.agent || req.agent !== id) {
      return res.status(403).json({
        message: "Not authorized to request deletion"
      });
    }

    const record = await AgentInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Agent not found"
      });
    }

    const request = await RequestInstance.create({
      id,
      user: "agent",
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
      message: "Unexpected error: Failed to request agent deletion"
    });
  }
}
