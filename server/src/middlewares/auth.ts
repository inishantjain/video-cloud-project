import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/custom-error";
import asyncWrapper from "./async";

export const authMiddleware = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader || authHeader?.startsWith("Bearer ")) token = authHeader.split(/ /)[1];
  else if (req.cookies.access_token) token = req.cookies.access_token;

  //if token missing
  if (!token) throw new UnAuthenticatedError("Token is missing");
  //verify the token
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.user = decode;
  } catch (error) {
    throw new UnAuthenticatedError("token is invalid");
  }
  next();
});
