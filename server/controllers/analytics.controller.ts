import { catchAsyncError } from "../middleware/catchAsyncErrors";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { generateLast12MonthData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import OrderModel from "../models/order.model";

// get all user analytics --admin-only

export const getUsersAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
     const AnalyticsData =await generateLast12MonthData(userModel);
      res.status(201).json({
        success: true,
        AnalyticsData
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

// get all course analytics --admin-only

export const getCoursesAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
     const AnalyticsData =await generateLast12MonthData(courseModel);
      res.status(201).json({
        success: true,
        AnalyticsData
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

// get all order analytics --admin-only

export const getOrdersAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
     const AnalyticsData =await generateLast12MonthData(OrderModel);
      res.status(201).json({
        success: true,
        AnalyticsData
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);
