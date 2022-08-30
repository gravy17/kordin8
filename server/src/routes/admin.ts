import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  registerAdmin,
  loginAdmin,
  updateAdmin,
  getAdminInfo,
  logoutAdmin
} from "../controllers/admin";
const router = Router();

router.get("/logout", logoutAdmin);
router.get("/:id", auth, getAdminInfo);
router.post("/login", loginAdmin);
router.post("/register", auth, registerAdmin);
router.patch("/:id", auth, updateAdmin);

export default router;
