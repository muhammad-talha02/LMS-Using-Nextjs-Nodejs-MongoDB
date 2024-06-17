"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersService = exports.newOrder = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const order_model_1 = __importDefault(require("../models/order.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.newOrder = (0, catchAsyncErrors_1.catchAsyncError)(async (data, res, next) => {
    const order = await order_model_1.default.create(data);
    res.status(200).json({
        success: true,
        order,
    });
});
// Get All Orders
const getAllOrdersService = async (res) => {
    const getAllorders = await order_model_1.default.find().sort({ createdAt: -1 }).lean();
    const AllOrdersData = await Promise.all(getAllorders.map(async (order) => {
        const course = await course_model_1.default.findById(order.courseId).lean();
        const user = await user_model_1.default.findById(order.userId).lean();
        return {
            ...order,
            userName: user?.name,
            userEmail: user?.email,
            title: course?.name,
            price: course?.price
        };
    }));
    res.status(201).json({
        success: true,
        orders: AllOrdersData,
    });
};
exports.getAllOrdersService = getAllOrdersService;
