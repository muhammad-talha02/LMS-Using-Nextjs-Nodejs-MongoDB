import express from "express";
import { authrizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  getLayout,
  updateLayout,
} from "../controllers/layout.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authrizeRoles("admin"),
  createLayout
);

layoutRouter.put(
  "/update-layout",
  isAuthenticated,
  authrizeRoles("admin"),
  updateLayout
);
layoutRouter.get("/get-layout/:type", getLayout);

export default layoutRouter;
