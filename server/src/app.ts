import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import db from "./config/db.config";
import indexRouter from "./routes/index";
import customerRouter from "./routes/customer";
import adminRouter from "./routes/admin";
import agentRouter from "./routes/agent";
import orderRouter from "./routes/order";
import trackingRouter from "./routes/tracking";
import cors from "cors";

db.sync()
  .then(() => {
    console.info("Database connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, "..", "public")));

app.use(
  cors({
    origin: process.env.CLIENT_APP_URL,
    methods: ["GET", "HEAD", "OPTIONS", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: [
      "X-Powered-By",
      "Access-Control-Allow-Origin",
      "Vary",
      "Access-Control-Allow-Credentials",
      "Set-Cookie",
      "Content-Type",
      "Content-Length",
      "ETag",
      "Date",
      "Connection",
      "Keep-Alive"
    ],
    allowedHeaders: [
      "Cookie",
      "Cache-Control",
      "Content-Type",
      "Content-Length",
      "Host",
      "User-Agent",
      "Accept",
      "Accept-Encoding",
      "X-Requested-With",
      "Connection",
      "Authorization"
    ]
  })
);

app.use("/", indexRouter);

app.use("/customer", customerRouter);
app.use("/admin", adminRouter);
app.use("/agent", agentRouter);
app.use("/order", orderRouter);
app.use("/track", trackingRouter);

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(function (err: createError.HttpError, req: Request, res: Response) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ message: res.locals.message, error: res.locals.error });
});

export default app;
