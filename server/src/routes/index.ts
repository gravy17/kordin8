import { Router, Request, Response } from "express";
const router = Router();

router.get("/", function (req: Request, res: Response) {
  res
    .status(304)
    .redirect("https://documenter.getpostman.com/view/23045732/VUxNR8A1");
});

export default router;
