import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import path from "node:path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { redis } from "../utils/redis";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      if (payment_info && "id" in payment_info) {
        const paymentIntentId = payment_info.id;

        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId
        );
        if (paymentIntent.status != "succeeded") {
          return next(new ErrorHandler("Payment not authorized", 400));
        }
      }

      const user = await userModel.findById(req.user?._id);
      const userCourseExists = user?.courses.some(
        (course: any) => course?._id.toString() === courseId
      );
      if (userCourseExists) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 400));
      }

      const data: any = {
        courseId: course?._id,
        userId: user?._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-mail.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Completed Successfully",
            template: "order-mail.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 404));
      }
      //Added course in user

      user?.courses.push(course?._id);
// Update user on Redis Cache
      await redis.set(req.user?._id, JSON.stringify(user));
      await user?.save();
      // Increase purchased in course
      course.purchased !== undefined
        ? (course.purchased += 1)
        : course.purchased;

      await course.save();

      await NotificationModel.create({
        userId: user?._id,
        title: "New Order",
        message: `You have a new Order for ${course?.name}`,
      });

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

// get all orders -- admin-only

export const getAllOrders = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Send Stripe publishable Keys

export const sendStripePublishableKey = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

// Make New Payment

export const makeNewPayment = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
          company: "Compile Academy",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(201).json({
        sucess: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
