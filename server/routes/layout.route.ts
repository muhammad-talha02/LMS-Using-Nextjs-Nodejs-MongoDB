import express from "express";
import { authrizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  getLayout,
  updateLayout,
} from "../controllers/layout.controller";
import { updateAcessToken } from "../controllers/user.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  createLayout
);

layoutRouter.put(
  "/update-layout",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  updateLayout
);
layoutRouter.get("/get-layout/:type", getLayout);

export default layoutRouter;
