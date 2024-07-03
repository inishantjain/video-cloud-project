import { CustomError } from "../errors/custom-error";
import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { MongoError } from "mongodb";

export const errorHandlerMiddleware = (
  err: CustomError | MongooseError | MongoError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError: CustomError = new CustomError(err.message || "Something went wrong");

  if (err instanceof CustomError) {
    customError = err;
  } else if (err instanceof MongooseError.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    customError.message = messages.join(", ");
    customError.statusCode = 400;
  } else if (err instanceof MongooseError.CastError) {
    customError.message = `No item found for ${err.value}`;
    customError.statusCode = 404;
  } else if ((err as MongoError).code === 11000) {
    customError.message = `Duplicate value entered for a field which accepts unique`;
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({ message: customError.message });
};
