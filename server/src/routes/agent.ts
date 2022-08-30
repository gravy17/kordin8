import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  getAgents,
  registerAgent,
  loginAgent,
  updateAgent,
  getAgentInfo,
  logoutAgent,
  deleteAgent,
  requestDeletion
} from "../controllers/agent";
const router = Router();

router.get("/get-all", auth, getAgents);
router.get("/logout", logoutAgent);
router.post("/login", loginAgent);
router.post("/register", registerAgent);

router.get("/:id", auth, getAgentInfo);
router.patch("/:id", auth, updateAgent);
router.delete("/:id", auth, deleteAgent);
router.post("/my-info/:id", auth, requestDeletion);

export default router;
