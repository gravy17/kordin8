import express from "express";
import {
  AgentKycRecord,
  RegisterAgent,
  updateAgentRecord,
  LoginAgent,
  LogoutAgent,
  orderInfo
} from "../controllers/agent";

const router = express.Router();

router.get("/order", orderInfo);
router.post("/createKyc", AgentKycRecord);
router.post("/register", RegisterAgent);
router.post("/login", LoginAgent);
router.post("/logout", LogoutAgent);
router.put("/update/:id", updateAgentRecord);

export default router;
