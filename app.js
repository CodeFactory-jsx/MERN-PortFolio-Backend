import express from 'express';          
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dbConnection from './Database/dbconnection.js';
import { errorMiddleware } from './Middlewares/error.js';
import messageRouter from "./Router/messageRoutes.js";
import userRouter from "./Router/userRoutes.js";
import timelineRoute from "./Router/timelineRouter.js";
import softwareApplicationRouter from "./Router/softwareApplicaitonRoutes.js";
import skillRouter from "./Router/skillRouter.js";
import projectRouter from "./Router/projectRouter.js";


const app = express();
dotenv.config({path: "./Config/.env"})

app.use(cors({
    origin:[process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods:["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}))   // I use to connect frontend and backend

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRoute);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();
app.use(errorMiddleware);

export default app; 