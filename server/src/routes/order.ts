import { Router } from "express";
import {
  getOrders,
  getOrderInfo,
  placeOrder,
  reassignOrder,
  updateOrder,
  requestCancellation,
  deleteOrder
} from "../controllers/order";
import { auth } from "../middleware/auth";
const router = Router();

router.get("/", auth, getOrders);
router.get("/:id", auth, getOrderInfo);
router.post("/", auth, placeOrder);
router.post("/:id", auth, reassignOrder);
router.patch("/:id", auth, updateOrder);
router.delete("/my-orders/:id", auth, requestCancellation);
router.delete("/:id", auth, deleteOrder);

export default router;
