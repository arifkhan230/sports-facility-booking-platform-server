import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandlers";
import httpStatus from "http-status";

export const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// applications routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to the Sports Facility Booking Platform");
});

// No Route Found
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "Not Found",
  });
});

// global error handler
app.use(globalErrorHandler);
