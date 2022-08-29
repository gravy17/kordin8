import { Router, Request, Response } from "express";
const router = Router();

router.get("/", function (req: Request, res: Response) {
  res.send("you've hit the server. We should serve you api docs here");
});

export default router;
