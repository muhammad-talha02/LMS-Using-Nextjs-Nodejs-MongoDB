"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersAnalytics = exports.getCoursesAnalytics = exports.getUsersAnalytics = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const analytics_generator_1 = require("../utils/analytics.generator");
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
// get all user analytics --admin-only
exports.getUsersAnalytics = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const AnalyticsData = await (0, analytics_generator_1.generateLast12MonthData)(user_model_1.default);
        res.status(201).json({
            success: true,
            AnalyticsData
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 404));
    }
});
// get all course analytics --admin-only
exports.getCoursesAnalytics = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const AnalyticsData = await (0, analytics_generator_1.generateLast12MonthData)(course_model_1.default);
        res.status(201).json({
            success: true,
            AnalyticsData
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 404));
    }
});
// get all order analytics --admin-only
exports.getOrdersAnalytics = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const AnalyticsData = await (0, analytics_generator_1.generateLast12MonthData)(order_model_1.default);
        res.status(201).json({
            success: true,
            AnalyticsData
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 404));
    }
});
