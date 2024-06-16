"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNewPayment = exports.sendStripePublishableKey = exports.getAllOrders = exports.createOrder = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const order_service_1 = require("../services/order.service");
const node_path_1 = __importDefault(require("node:path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const redis_1 = require("../utils/redis");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.createOrder = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { courseId, payment_info } = req.body;
        if (payment_info && "id" in payment_info) {
            const paymentIntentId = payment_info.id;
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            if (paymentIntent.status != "succeeded") {
                return next(new ErrorHandler_1.default("Payment not authorized", 400));
            }
        }
        const user = await user_model_1.default.findById(req.user?._id);
        const userCourseExists = user?.courses.some((course) => course?._id.toString() === courseId);
        if (userCourseExists) {
            return next(new ErrorHandler_1.default("You have already purchased this course", 400));
        }
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 400));
        }
        const data = {
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
        const html = await ejs_1.default.renderFile(node_path_1.default.join(__dirname, "../mails/order-mail.ejs"), { order: mailData });
        try {
            if (user) {
                await (0, sendMail_1.default)({
                    email: user.email,
                    subject: "Order Completed Successfully",
                    template: "order-mail.ejs",
                    data: mailData,
                });
            }
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 404));
        }
        //Added course in user
        user?.courses.push(course?._id);
        // Update user on Redis Cache
        await redis_1.redis.set(req.user?._id, JSON.stringify(user));
        await user?.save();
        // Increase purchased in course
        course.purchased !== undefined
            ? (course.purchased += 1)
            : course.purchased;
        await course.save();
        await notification_model_1.default.create({
            userId: user?._id,
            title: "New Order",
            message: `You have a new Order for ${course?.name}`,
        });
        (0, order_service_1.newOrder)(data, res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 404));
    }
});
// get all orders -- admin-only
exports.getAllOrders = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        (0, order_service_1.getAllOrdersService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// Send Stripe publishable Keys
exports.sendStripePublishableKey = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    res.status(200).json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});
// Make New Payment
exports.makeNewPayment = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
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
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
