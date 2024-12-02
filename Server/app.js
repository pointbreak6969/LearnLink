import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
const app = express();
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// Security
app.use(helmet());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests from this IP, please try again after 15 minutes",
// });
// app.use(limiter);

// Logging
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//import routes
import userRotuer from "./routes/user.routes.js";
import profileRouter from "./routes/profile.routes.js";
import resourceRouter from "./routes/resources.routes.js";
import classroomRouter from "./routes/classroom.routes.js";

//routes declaration
app.use("/api/v1/user", userRotuer);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/resource", resourceRouter);
app.use("/api/v1/classroom", classroomRouter);
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});
app.use(errorHandler);
export { app };
