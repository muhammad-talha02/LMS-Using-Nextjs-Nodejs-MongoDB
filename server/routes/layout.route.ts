import express from "express"
import { authrizeRoles, isAuthenticated } from "../middleware/auth"
import { createLayout } from "../controllers/layout.controller"

const layoutRouter = express.Router()



layoutRouter.post("/create-layout", isAuthenticated, authrizeRoles('admin'), createLayout)



export default layoutRouter