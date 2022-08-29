import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { AgentInstance } from "../models/agent";
import {
  agentKycSchema,
  options,
  updateAgentSchema,
  registerAgentSchema,
  loginSchema,
  generateToken
} from "../utils/agent-validation";
// import { CustomerInstance } from "../models/customer";
import { OrderInstance } from "../models/order";
import bcrypt from "bcryptjs";

export async function RegisterAgent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  // let users = { ...req.body, id };
  try {
    const validateResult = registerAgentSchema.validate(req.body, options);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }

    const duplicateEmail = await AgentInstance.findOne({
      where: { email: req.body.email }
    });
    if (duplicateEmail) {
      res.status(409).json({ msg: "Email has been used, Enter another email" });
    }

    const duplicatePhoneNumber = await AgentInstance.findOne({
      where: { phoneNumber: req.body.phoneNumber }
    });

    if (duplicatePhoneNumber) {
      res.status(409).json({ msg: "Phone number has been used " });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);

    const agent = {
      id: id,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      bvn: req.body.bvn,
      // dob: req.body.dob,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      // address: req.body.address,
      // govtIdRef: req.body.govtIdRef,
      // service: req.body.service,
      // maxOrders: req.body.maxOrders,
      password: passwordHash
    };

    const record = await AgentInstance.create(agent);
    res
      .status(200)
      .json({ msg: "You have successfully created your profile", record });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Failed to create agent",
      route: "/register"
    });
  }
}

export async function AgentKycRecord(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();

  try {
    const verified = req.user;

    const validateResult = agentKycSchema.validate(req.body, options);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }

    const agent = { id: id, ...req.body, verifiedAgent: verified.id };

    const record = await AgentInstance.create(agent);

    res.status(201).json({
      msg: "You have successfully add additional information",
      record
    });
  } catch (err) {
    res.status(500).json({
      msg: "Failed to create Additional Information",
      route: "/createKyc"
    });
  }
}

export async function updateAgentRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    // const { id } = req.params;
    const {
      lastName: lastName,
      firstName: firstName,
      bvn: bvn,
      dob: dob,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      govtIdRef: govtIdRef,
      service: service,
      maxOrders: maxOrders
    } = req.body;
    const validateResult = updateAgentSchema.validate(req.body, options);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }

    const record = await AgentInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        Error: "Cannot find existing profile"
      });
    }
    const updatedRecord = await record.update({
      lastName: lastName,
      firstName: firstName,
      bvn: bvn,
      dob: dob,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      govtIdRef: govtIdRef,
      service: service,
      maxOrders: maxOrders
    });

    res.status(202).json({
      msg: "You have successfully updated your profile",
      record: updatedRecord
    });
  } catch (err) {
    res.status(500).json({
      msg: "Failed to update your profile",
      route: "/update/:id"
    });
  }
}

export async function LoginAgent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();

  try {
    const validateResult = loginSchema.validate(req.body, options);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }

    const agent = (await AgentInstance.findOne({
      where: { email: req.body.email }
    })) as unknown as { [key: string]: string };

    const { id } = agent;

    const token = generateToken({ id });
    // console.log("before");

    const validUser = await bcrypt.compare(req.body.password, agent.password);
    // console.log("after");

    if (!validUser) {
      res.status(401).json({
        msg: "Incorrect credentials"
      });
    }

    if (validUser) {
      res.cookie("authorization", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24
      });
      res.cookie("id", id, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      });

      res.status(200).json({ msg: "Login Successfully", agent });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      mess: err,
      msg: "Failed to login",
      route: "/login"
    });
  }
}

export async function LogoutAgent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("authorization");
    res.clearCookie("id");
    res.status(200).json({ msg: "Logout Successfully" });
  } catch (err) {
    res.status(500).json({
      msg: "failed to logout",
      route: "/logout"
    });
  }
}

export async function orderInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.cookies.id;
    const agent = (await AgentInstance.findOne({
      where: { id: id },
      include: [{ model: OrderInstance, as: "Orders" }]
    })) as unknown as { [key: string]: string };
    res.status(200).json({ msg: "Here are your orders", agent });
  } catch (err) {
    res.status(500).json({
      msg: "failed to fetch order",
      route: "/order"
    });
  }
}

export default {
  AgentKycRecord,
  RegisterAgent,
  updateAgentRecord,
  LoginAgent,
  LogoutAgent,
  orderInfo
};

//

// export async function getOrderRecord(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const limit = req.query?.limit as number | undefined;
//     const offset = req.query?.offset as number | undefined;
//     // const record = await TodoInstance.findAll({ where: {}, limit });
//     const record = await AgentInstance.findAndCountAll({
//       limit,
//       offset,
//       include: [
//         {
//           model: AgentInstance,
//           attributes: [
//             "id",
//             "DoctorsName",
//             "email",
//             "specialization",
//             "phoneNumber"
//           ],
//           as: "Doctors"
//         }
//       ]
//     });

//     // res.render("index", { record: record.rows });

//     // res.status(200).json({
//     //   msg: "You have successfully fetch all patient reports",
//     //   count: record.count,
//     //   record: record.rows,
//     // });
//   } catch (err) {
//     res.status(500).json({
//       msg: "Failed to fetch all patient reports",
//       route: "/read"
//     });
//   }
// }

// export async function getSingleAgentRecord(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     // const doctor = req.params.doctor;
//     // OR
//     // console.log(req.params);
//     const { id } = req.params;

//     const record = await AgentInstance.findOne({
//       where: { id }
//     });
//     res
//       .status(200)
//       .json({ msg: "You have successfully find your agent", record });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       msg: "Failed to read single agent",
//       route: "/read/:id"
//     });
//   }
// }

// export async function getDeleteSinglePatientRecord(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { patientId } = req.params;
//     const record = await AgentInstance.findOne({ where: { id } });

//     res
//       .status(200)
//       .json({ msg: "You have successfully delete your agent", record });
//   } catch (error) {
//     res.status(500).json({
//       msg: "failed to read single patient report",
//       route: "/read/:id"
//     });
//   }
// }
