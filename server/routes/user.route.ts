import express from "express";
import { activateUser, loginUser, logoutUser, registrationUser, updateAcessToken } from "../controllers/user.controller";
import { authrizeRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();


userRouter.post("/registration" , registrationUser);
userRouter.post("/activation-user", activateUser)
userRouter.post("/login", loginUser)
userRouter.get("/logout",isAuthenticated,authrizeRoles("user"), logoutUser)
userRouter.get("/refresh", updateAcessToken)

export default userRouter