import express from "express";
import { getAllNotifications, updateNotification } from "../controllers/notification.controller";
import { authrizeRoles, isAuthenticated } from "../middleware/auth";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authrizeRoles("admin"),
  getAllNotifications
);

notificationRouter.put(
  "/update-notification/:id",
  isAuthenticated,
  authrizeRoles("admin"),
  updateNotification
);

export default notificationRouter;
