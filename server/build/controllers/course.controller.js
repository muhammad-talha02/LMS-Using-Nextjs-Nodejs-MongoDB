"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideoUrl = exports.deleteCourse = exports.getAllCoursesByAdmin = exports.addReplyToReview = exports.addReview = exports.addAnswer = exports.addQuestion = exports.getCourseByUser = exports.getAllCourses = exports.getSingleCourseAdminOnly = exports.getSingleCourse = exports.editCourse = exports.uploadCourse = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const cloudinary_1 = __importDefault(require("cloudinary"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const course_service_1 = require("../services/course.service");
const course_model_1 = __importDefault(require("../models/course.model"));
const redis_1 = require("../utils/redis");
const mongoose_1 = __importDefault(require("mongoose"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const axios_1 = __importDefault(require("axios"));
// Upload Course
exports.uploadCourse = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        await redis_1.redis.del("getAllCourses");
        (0, course_service_1.createCourse)(data, res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.editCourse = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (!thumbnail?.public_id) {
            // await cloudinary.v2.uploader.destroy(thumbnail.public_id);
            const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        const courseId = req.params.id;
        const course = await course_model_1.default.findByIdAndUpdate(courseId, { $set: data }, { new: true });
        await redis_1.redis.set(courseId, JSON.stringify(course));
        res.status(201).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// ? Get single course --without purchasing
exports.getSingleCourse = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const courseId = req.params.id;
        // ChecknID is Valid or Not
        const isValidID = mongoose_1.default.isValidObjectId(courseId);
        if (isValidID) {
            // Check Cache is Exist
            const isCatchExist = await redis_1.redis.get(courseId);
            if (isCatchExist) {
                const course = JSON.parse(isCatchExist);
                res.status(200).json({
                    success: true,
                    course,
                });
            }
            else {
                const course = await course_model_1.default
                    .findById(req.params.id)
                    .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
                if (!course) {
                    return next(new ErrorHandler_1.default("Course not found", 400));
                }
                await redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
                res.status(200).json({
                    success: true,
                    course,
                });
            }
        }
        else {
            return next(new ErrorHandler_1.default("Invalid Object ID", 400));
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// ? Get single course --for Admin Only
exports.getSingleCourseAdminOnly = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const courseId = req.params.id;
        // ChecknID is Valid or Not
        const isValidID = mongoose_1.default.isValidObjectId(courseId);
        if (isValidID) {
            // Check Cache is Exist
            const isCatchExist = await redis_1.redis.get(courseId);
            if (isCatchExist) {
                const course = JSON.parse(isCatchExist);
                res.status(200).json({
                    success: true,
                    course,
                });
            }
            else {
                const course = await course_model_1.default.findById(req.params.id);
                if (!course) {
                    return next(new ErrorHandler_1.default("Course not found", 400));
                }
                await redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
                res.status(200).json({
                    success: true,
                    course,
                });
            }
        }
        else {
            return next(new ErrorHandler_1.default("Invalid Object ID", 400));
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// ? Get All courses --without purchasing
exports.getAllCourses = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const isCatchExist = await redis_1.redis.get("getAllCourses");
        if (isCatchExist) {
            const { courses, Total } = JSON.parse(isCatchExist);
            res.status(200).json({
                success: true,
                Total,
                courses,
            });
        }
        else {
            const courses = await course_model_1.default
                .find()
                .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            const Total = await course_model_1.default.countDocuments();
            await redis_1.redis.set("getAllCourses", JSON.stringify({ courses, Total }));
            res.status(200).json({
                success: true,
                Total,
                courses,
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// get course content -- only for valid user
exports.getCourseByUser = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const userCoursesList = req.user?.courses;
        const courseId = req.params.id;
        const courseExist = userCoursesList?.find((course) => course._id.toString() === courseId);
        if (!courseExist) {
            return next(new ErrorHandler_1.default("You are not eligible for this course", 400));
        }
        const course = await course_model_1.default.findById(courseId);
        const content = course?.courseData;
        res.status(200).json({
            success: true,
            content,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.addQuestion = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { question, courseId, contentId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid Content id", 400));
        }
        const courseContent = course?.courseData?.find((item) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Invalid content id h", 400));
        }
        // create question Object
        const newQuestion = {
            user: req.user,
            question,
            questionReplies: [],
        };
        // add this question to our course content
        courseContent.questions.push(newQuestion);
        await notification_model_1.default.create({
            userId: req.user?._id,
            title: `New Question from ${req.user?.name}`,
            message: `You have a new question in ${courseContent?.title}`,
        });
        await course?.save();
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.addAnswer = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { answer, courseId, contentId, questionId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid Content id", 400));
        }
        const courseContent = course?.courseData?.find((item) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Invalid content id h", 400));
        }
        const question = courseContent?.questions?.find((item) => item._id.equals(questionId));
        if (!question) {
            return next(new ErrorHandler_1.default("Invalid question id", 400));
        }
        //  Create a new answer Object
        const newAnswer = {
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
            await notification_model_1.default.create({
                userId: req.user?._id,
                title: "Answer on a Question",
                message: `${req.user?.name} reply on a question in ${courseContent?.title}`,
            });
        }
        else {
            const data = {
                name: question.user.name,
                title: courseContent.title,
            };
            const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/question-reply.ejs"), data);
            try {
                await (0, sendMail_1.default)({
                    email: question.user.email,
                    subject: "Question Replies",
                    template: "question-reply.ejs",
                    data,
                });
            }
            catch (error) {
                return next(new ErrorHandler_1.default(error.message, 400));
            }
        }
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.addReview = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
        // check userId exist in user userCoursesList based on _id
        const courseExists = userCourseList?.some((course) => course._id === courseId);
        if (!courseExists) {
            return next(new ErrorHandler_1.default("You are not eligible to access this course", 404));
        }
        const course = await course_model_1.default.findById(courseId);
        const { review, rating } = req.body;
        const reviewData = {
            user: req.user,
            comment: review,
            rating,
        };
        await redis_1.redis.del(course?._id);
        course?.reviews.push(reviewData);
        let avg = 0;
        course?.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        if (course) {
            course.ratings = avg / course?.reviews.length;
        }
        await course?.save();
        // create notification
        await notification_model_1.default.create({
            userId: req.user?._id,
            title: "New Review Recieved",
            message: `${req.user?.name} has given a review on ${course?.name}`,
        });
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 404));
    }
});
exports.addReplyToReview = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { comment, courseId, reviewId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        const review = course.reviews?.find((rev) => rev?._id.toString() === reviewId);
        if (!review) {
            return next(new ErrorHandler_1.default("Review not found", 404));
        }
        const replyData = {
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
        await redis_1.redis.del(course?._id);
        // const after = await redis.get(course?._id)
        // console.log({before, after})
        // await redis.set(courseId, JSON.stringify(course));
        await course.save();
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 404));
    }
});
// Get All Courses --admin-only
exports.getAllCoursesByAdmin = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        (0, course_service_1.getAllCoursesService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// DELETE Course ---ONLY FOR ADMIN
exports.deleteCourse = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await course_model_1.default.findById(id);
        if (!course) {
            return next(new ErrorHandler_1.default("course not found", 400));
        }
        await course.deleteOne({ id });
        await redis_1.redis.del(id);
        res.status(201).json({
            success: true,
            message: "Course Delete Successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// Generate Video URL
exports.generateVideoUrl = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { videoId } = req.body;
        const response = await axios_1.default.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 300 }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Apisecret ${process.env.VDOCIPHER_SECRET_API}`,
            },
        });
        res.json(response.data);
    }
    catch (error) {
        return new ErrorHandler_1.default(error.message, 400);
    }
});
