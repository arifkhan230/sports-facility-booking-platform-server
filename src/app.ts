import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandlers";

export const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// applications routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to the Sports Facility Booking Platform server");
});

// for wrong route
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

// global error handler
app.use(globalErrorHandler);
