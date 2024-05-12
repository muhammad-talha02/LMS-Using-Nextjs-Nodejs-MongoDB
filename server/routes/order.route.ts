import express from "express";
import {
  createOrder,
  getAllOrders,
  makeNewPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller";
import { authrizeRoles, isAuthenticated } from "../middleware/auth";
import { updateAcessToken } from "../controllers/user.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);
orderRouter.get(
  "/get-all-orders",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  getAllOrders
);
orderRouter.get("/payment/stripePublishableKey", sendStripePublishableKey);
orderRouter.post("/payment/new", isAuthenticated , makeNewPayment);
export default orderRouter;
