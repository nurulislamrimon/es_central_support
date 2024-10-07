import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    throw new ApiError(403, "Access forbidden!");
  }
  next();
};
