import express from "express";
import {
  createOrderController,
  getAllOrdersController,
} from "../controllers/orderController";
import { validateOrder } from "../middleware/validateOrder";

const router = express.Router();

router.post("/", validateOrder, createOrderController);
router.get("/", getAllOrdersController);

export default router;
