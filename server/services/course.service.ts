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
