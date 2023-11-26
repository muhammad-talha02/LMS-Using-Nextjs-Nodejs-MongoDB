import express from "express";
import {
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authrizeRoles, isAuthenticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authrizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/update-course/:id",
  isAuthenticated,
  authrizeRoles("admin"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);

// Get course By ID

courseRouter.get("/get-course-content/:id",isAuthenticated, getCourseByUser);

export default courseRouter;
