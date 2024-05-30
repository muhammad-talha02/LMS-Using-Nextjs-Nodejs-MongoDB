import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getAllCoursesByAdmin,
  getCourseByUser,
  getSingleCourse,
  getSingleCourseAdminOnly,
  uploadCourse,
} from "../controllers/course.controller";
import { authrizeRoles, isAuthenticated } from "../middleware/auth";
import { updateAcessToken } from "../controllers/user.controller";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  uploadCourse
);

courseRouter.get(
  "/get-single-course/:id",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  getSingleCourseAdminOnly
);

courseRouter.put(
  "/update-course/:id",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);

// Get course By ID

courseRouter.get("/get-course-content/:id",updateAcessToken, isAuthenticated, getCourseByUser);

// Add Question

courseRouter.put("/add-question", updateAcessToken, isAuthenticated, addQuestion);

// Add Answer

courseRouter.put("/add-answer",updateAcessToken, isAuthenticated, addAnswer);

// Add Review in Course

courseRouter.put("/add-review/:id", updateAcessToken, isAuthenticated, addReview);

// Add Reply in Review in Course

courseRouter.put(
  "/add-reply",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  addReplyToReview
);

// get all courses for admin

courseRouter.get(
  "/get-all-courses",
  // updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  getAllCoursesByAdmin
);

// generate video Url

courseRouter.post("/getVdoCipherOtp", generateVideoUrl);
// delete course by admin

courseRouter.delete(
  "/delete-course/:id",
  updateAcessToken,
  isAuthenticated,
  authrizeRoles("admin"),
  deleteCourse
);
export default courseRouter;
