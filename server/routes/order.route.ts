import express from "express"
import { createOrder, getAllOrders } from "../controllers/order.controller"
import { authrizeRoles, isAuthenticated } from "../middleware/auth"
const orderRouter = express.Router()

orderRouter.post("/create-order",isAuthenticated, createOrder)
orderRouter.get("/get-all-orders",isAuthenticated,authrizeRoles("admin"), getAllOrders)

export default orderRouter