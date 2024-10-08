import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { config } from "../config";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      throw new ApiError(403, "Access forbidden!");
    }
    //   verify accessToken
    const payload: JwtPayload | string = jwt.verify(
      accessToken,
      config.accessTokenSecret
    );
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
