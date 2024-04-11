import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/order.model";
import courseModel from "../models/course.model";
import userModel from "../models/user.model";

export const newOrder = catchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
    res.status(200).json({
      success: true,
      order,
    });
  }
);

// Get All Orders

export const getAllOrdersService = async (res: Response) => {
  const getAllorders = await OrderModel.find().sort({ createdAt: -1 }).lean();
  const AllOrdersData =await Promise.all(
    getAllorders.map(async(order: any) => {
      const course =await courseModel.findById(order.courseId).lean();
      const user =await userModel.findById(order.userId).lean();
      return {
        ...order,
        userName: user?.name,
        userEmail: user?.email,
        title: course?.name,
        price:course?.price
      };
    })
  );
  res.status(201).json({
    success: true,
    orders: AllOrdersData,
  });
};
