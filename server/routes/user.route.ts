import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAcessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authrizeRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activation-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/refresh", updateAcessToken);

userRouter.get("/me", updateAcessToken, isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/updateUser", updateAcessToken, isAuthenticated, updateUserInfo);

userRouter.put("/updatePassword", updateAcessToken, isAuthenticated, updatePassword);

userRouter.put("/updateAvatar", updateAcessToken, isAuthenticated, updateProfilePicture);

userRouter.get(
  "/get-all-users",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  getAllUsers
);

userRouter.put(
  "/update-user-role",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  deleteUser
);

export default userRouter;
