import { Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import courseModel from "../models/course.model";

export const createCourse = catchAsyncError(
  async (data: any, res: Response) => {
    const course = await courseModel.create(data)
    res.status(201).json({
        success:true,
        course
    })
  }
);


// Get All Courses

export const getAllCoursesService = async (res: Response) => {
  const courses = await courseModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};