require("dotenv").config()
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
export const app = express();
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";


// ? Middlewares

// body parser

app.use(express.json({limit:"50mb"}));

// cookie parser

app.use(cookieParser());

//  cors => cross origin resoure sharing

app.use(cors({
    origin:process.env.ORIGIN
}));

// Routes

app.use("/api/v1", userRouter)
app.use("/api/v1", courseRouter)

// testing API

app.get("/test", (req:Request, res:Response , next:NextFunction)=>{
    res.status(200).json({
        success:true,
        message:"API is working"
    })
});


// unknown route

app.all("*", (req:Request, res:Response, next:NextFunction)=>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err)
});

app.use(ErrorMiddleware);