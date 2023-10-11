require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import Jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { sendToken } from "../utils/jwt";
// Register User

interface IRegisterationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, avatar } = req.body;
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already Exist", 400));
      }
      const user: IRegisterationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;
      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );
      try {
        await sendMail({
          email: user.email,
          subject: "Activate Your Account",
          template: "activation-mail.ejs",
          data,
        });

        res.status(200).json({
          success: true,
          message: `Please check your ${user.email} to activate account `,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (
  user: IRegisterationBody
): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = Jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET_KEY as Secret,
    {
      expiresIn: "5m",
    }
  );
  console.log(token);
  return { token, activationCode };
};

// Activate user

interface IActivateRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivateRequest;

      const newUser: { user: IUser; activationCode: string } = Jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET_KEY as string
      ) as { user: IUser; activationCode: string };
      console.log(newUser);
      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("invalid activation code", 400));
      }
      const { name, email, password } = newUser.user;
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler("Email already exist", 400));
      }
      const user = await userModel.create({
        name,
        email,
        password,
      });
      res.status(200).json({
        success: true,
        message: "User Registered Successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Login User

interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      const user = await userModel.findOne({email}).select("+password")
      console.log(user)
      if(!user){
        return next(new ErrorHandler("Email not exist", 400))
      }

      const isPasswordMatch = await user.comparePassword(password);
      if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid password", 400))
      }

      sendToken(user, 200, res)
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


// logout user

export const logoutUser = catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    res.cookie("access_token", "", {maxAge:1});
    res.cookie("refresh_token", "", {maxAge:1});
    res.status(200).json({
      success:true,
      message:"Logout Successfully"
    })
    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
  }
})