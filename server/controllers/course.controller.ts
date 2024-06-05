import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse, getAllCoursesService } from "../services/course.service";
import courseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import axios from "axios";

// Upload Course

export const uploadCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      await redis.del("getAllCourses");
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const editCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (!thumbnail?.public_id) {
        // await cloudinary.v2.uploader.destroy(thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      const courseId = req.params.id;

      const course = await courseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );
      await redis.set(courseId, JSON.stringify(course));
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// ? Get single course --without purchasing

export const getSingleCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      // ChecknID is Valid or Not

      const isValidID = mongoose.isValidObjectId(courseId);

      if (isValidID) {
        // Check Cache is Exist
        const isCatchExist = await redis.get(courseId);

        if (isCatchExist) {
          const course = JSON.parse(isCatchExist);
          res.status(200).json({
            success: true,
            course,
          });
        } else {
          const course = await courseModel
            .findById(req.params.id)
            .select(
              "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
            );

          if (!course) {
            return next(new ErrorHandler("Course not found", 400));
          }

          await redis.set(courseId, JSON.stringify(course), "EX", 604800);
          res.status(200).json({
            success: true,
            course,
          });
        }
      } else {
        return next(new ErrorHandler("Invalid Object ID", 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// ? Get single course --for Admin Only

export const getSingleCourseAdminOnly = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      // ChecknID is Valid or Not

      const isValidID = mongoose.isValidObjectId(courseId);

      if (isValidID) {
        // Check Cache is Exist
        const isCatchExist = await redis.get(courseId);

        if (isCatchExist) {
          const course = JSON.parse(isCatchExist);
          res.status(200).json({
            success: true,
            course,
          });
        } else {
          const course = await courseModel.findById(req.params.id);

          if (!course) {
            return next(new ErrorHandler("Course not found", 400));
          }

          await redis.set(courseId, JSON.stringify(course), "EX", 604800);
          res.status(200).json({
            success: true,
            course,
          });
        }
      } else {
        return next(new ErrorHandler("Invalid Object ID", 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// ? Get All courses --without purchasing

export const getAllCourses = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCatchExist = await redis.get("getAllCourses");
      if (isCatchExist) {
        const { courses, Total } = JSON.parse(isCatchExist);
        res.status(200).json({
          success: true,
          Total,
          courses,
        });
      } else {
        const courses = await courseModel
          .find()
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          );
        const Total = await courseModel.countDocuments();

        await redis.set("getAllCourses", JSON.stringify({ courses, Total }));
        res.status(200).json({
          success: true,
          Total,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get course content -- only for valid user

export const getCourseByUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCoursesList = req.user?.courses;
      const courseId = req.params.id;
      const courseExist = userCoursesList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExist) {
        return next(
          new ErrorHandler("You are not eligible for this course", 400)
        );
      }
      const course = await courseModel.findById(courseId);

      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// add question in course

interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId } = req.body as IAddQuestionData;
      const course = await courseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid Content id", 400));
      }

      const courseContent = course?.courseData?.find((item) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id h", 400));
      }

      // create question Object

      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      // add this question to our course content

      courseContent.questions.push(newQuestion);

      await NotificationModel.create({
        userId: req.user?._id,
        title: `New Question from ${req.user?.name}`,
        message: `You have a new question in ${courseContent?.title}`,
      });

      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// add answer in course question

interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnswer = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId }: IAddAnswerData =
        req.body;
      const course = await courseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid Content id", 400));
      }

      const courseContent = course?.courseData?.find((item) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id h", 400));
      }

      const question = courseContent?.questions?.find((item) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }

      //  Create a new answer Object

      const newAnswer: any = {
        user: req.user,
        answer,
        createAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // add this answer to our course content

      question.questionReplies?.push(newAnswer);

      await course?.save();

      if (req.user?._id === question?.user?._id) {
        // create a notification

        await NotificationModel.create({
          userId: req.user?._id,
          title: "Answer on a Question",
          message: `${req.user?.name} reply on a question in ${courseContent?.title}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data
        );

        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Replies",
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 400));
        }
      }
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Add Review in Course

interface IAddReviewData {
  review: string;
  courseId: string;
  rating: string;
  userId: string;
}

export const addReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      // check userId exist in user userCoursesList based on _id

      const courseExists = userCourseList?.some(
        (course: any) => course._id === courseId
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 404)
        );
      }

      const course = await courseModel.findById(courseId);

      const { review, rating } = req.body as IAddReviewData;
      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };
      await redis.del(course?._id);

      course?.reviews.push(reviewData);

      let avg = 0;

      course?.reviews.forEach((rev: any) => {
        avg += rev.rating;
      });

      if (course) {
        course.ratings = avg / course?.reviews.length;
      }

      await course?.save();

      // create notification

      await NotificationModel.create({
        userId: req.user?._id,
        title: "New Review Recieved",
        message: `${req.user?.name} has given a review on ${course?.name}`,
      });

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

// Add Replt to Add Review

interface IAddReplyReview {
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReplyReview;

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const review = course.reviews?.find(
        (rev: any) => rev?._id.toString() === reviewId
      );
      if (!review) {
        return next(new ErrorHandler("Review not found", 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
        createAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }
      review.commentReplies?.push(replyData);
      // const before = await redis.get(course?._id)
      await redis.del(course?._id);
      // const after = await redis.get(course?._id)
      // console.log({before, after})
      // await redis.set(courseId, JSON.stringify(course));

      await course.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

// Get All Courses --admin-only

export const getAllCoursesByAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// DELETE Course ---ONLY FOR ADMIN

export const deleteCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const course = await courseModel.findById(id);
      if (!course) {
        return next(new ErrorHandler("course not found", 400));
      }

      await course.deleteOne({ id });

      await redis.del(id);
      res.status(201).json({
        success: true,
        message: "Course Delete Successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Generate Video URL

export const generateVideoUrl = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;
      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_SECRET_API}`,
          },
        }
      );
      res.json(response.data);
    } catch (error: any) {
      return new ErrorHandler(error.message, 400);
    }
  }
);
