import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  getCustomerInfo,
  registerCustomer,
  loginCustomer,
  updateCustomer,
  logoutCustomer,
  deleteCustomer,
  requestDeletion
} from "../controllers/customer";
const router = Router();

router.get("/logout", logoutCustomer);
router.post("/login", loginCustomer);
router.post("/register", registerCustomer);

router.get("/:id", auth, getCustomerInfo);
router.patch("/:id", auth, updateCustomer);
router.delete("/:id", auth, deleteCustomer);
router.post("/my-info/:id", auth, requestDeletion);

export default router;
