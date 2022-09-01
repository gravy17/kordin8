import { Router } from "express";
import { auth } from "../middleware/auth";
import { registerTracking, trackOrder } from "../controllers/tracking";
const router = Router();

router.post("/order/:orderId", auth, registerTracking);
router.get("/:id", trackOrder);

export default router;
