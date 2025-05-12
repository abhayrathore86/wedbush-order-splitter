import express from "express";
import {
  createOrderController,
  getAllOrdersController,
} from "../controllers/orderController";

const router = express.Router();

router.post("/", createOrderController);
router.get("/", getAllOrdersController);

export default router;
