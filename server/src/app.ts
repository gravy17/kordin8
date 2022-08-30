import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import db from "./config/db.config";
import indexRouter from "./routes/index";
import customerRouter from "./routes/customer";
import adminRouter from "./routes/admin";

db.sync()
  .then(() => {
    console.info("Database connected succcesfully");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "..", "public")));

app.use("/", indexRouter);

app.use("/customer", customerRouter);
app.use("/admin", adminRouter);

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
