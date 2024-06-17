"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("../controllers/course.controller");
const auth_1 = require("../middleware/auth");
const user_controller_1 = require("../controllers/user.controller");
const courseRouter = express_1.default.Router();
courseRouter.post("/create-course", user_controller_1.updateAcessToken, auth_1.isAuthenticated, (0, auth_1.authrizeRoles)("admin"), course_controller_1.uploadCourse);
courseRouter.get("/get-single-course/:id", user_controller_1.updateAcessToken, auth_1.isAuthenticated, (0, auth_1.authrizeRoles)("admin"), course_controller_1.getSingleCourseAdminOnly);
courseRouter.put("/update-course/:id", user_controller_1.updateAcessToken, auth_1.isAuthenticated, (0, auth_1.authrizeRoles)("admin"), course_controller_1.editCourse);
courseRouter.get("/get-course/:id", course_controller_1.getSingleCourse);
courseRouter.get("/get-courses", course_controller_1.getAllCourses);
// Get course By ID
courseRouter.get("/get-course-content/:id", user_controller_1.updateAcessToken, auth_1.isAuthenticated, course_controller_1.getCourseByUser);
// Add Question
courseRouter.put("/add-question", user_controller_1.updateAcessToken, auth_1.isAuthenticated, course_controller_1.addQuestion);
// Add Answer
courseRouter.put("/add-answer", user_controller_1.updateAcessToken, auth_1.isAuthenticated, course_controller_1.addAnswer);
// Add Review in Course
courseRouter.put("/add-review/:id", user_controller_1.updateAcessToken, auth_1.isAuthenticated, course_controller_1.addReview);
// Add Reply in Review in Course
courseRouter.put("/add-reply", user_controller_1.updateAcessToken, auth_1.isAuthenticated, (0, auth_1.authrizeRoles)("admin"), course_controller_1.addReplyToReview);
// get all courses for admin
courseRouter.get("/get-all-courses", 
// updateAcessToken,
auth_1.isAuthenticated, (0, auth_1.authrizeRoles)("admin"), course_controller_1.getAllCoursesByAdmin);
// generate video Url
courseRouter.post("/getVdoCipherOtp", course_controller_1.generateVideoUrl);
// delete course by admin
courseRouter.delete("/delete-course/:id", user_controller_1.updateAcessToken, auth_1.isAuthenticated, (0, auth_1.authrizeRoles)("admin"), course_controller_1.deleteCourse);
exports.default = courseRouter;
