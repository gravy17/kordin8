import { Router, Request, Response, NextFunction } from "express";
import { CustomerInstance } from "../models/customer";
import { v4 as STRING } from "uuid";
const router = Router();

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("you've hit the users route");
});

router.post(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    const id = STRING() as string;
    const created = await CustomerInstance.create({
      id,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      password: "ofyourchoice"
    });
    res.status(201).json({ message: "successfully created", created });
  }
);

export default router;
