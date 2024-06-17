require("dotenv").config();
import { NextFunction, Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";
import { Secret } from "jsonwebtoken";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "./ErrorHandler";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

  // parse environment variables to integrate with fallback values

  export const accessTokenExpires = parseInt(
    process.env.ACCESS_TOKEN_EXPIRES || "300",
    10
  );
  export const refreshTokenExpires = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10
  );

  // option for cookies

  export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpires * 60 * 60 * 1000),
    maxAge: accessTokenExpires * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure:true
  };

  export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpires * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpires * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure:true
  };
  
  
  export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    
    // upload session to redis
    redis.set(user._id, JSON.stringify(user) as any);
    
    
  // only set true for production

  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
