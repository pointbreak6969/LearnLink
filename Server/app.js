import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import userRotuer from "./routes/user.routes.js"
import profileRouter from "./routes/profile.routes.js"
import resourceRouter from './routes/resources.routes.js'

//routes declaration
app.use("/api/v1/user", userRotuer);
app.use("/api/v1/profile",profileRouter)
app.use("/api/v1/resource",resourceRouter)

export { app };


