import { ErrorRequestHandler, RequestHandler } from "express";
import { IErrorMessages, sendResponse } from "../utils/sendResponse";
import {
  formatPrismaClientKnownError,
  formatPrismaValidationError,
  formatZodError,
} from "../app/helpers/errorFormatter";
import { ZodError } from "zod";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { deleteFile } from "../lib/file/deleteFiles";

export const notFoundRouteHandler: RequestHandler = (req, res, next) => {
  next({ message: "Route not found", statusCode: 404 });
};

// global error handler
export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  // if headers sended then return next(error);
  if (res.headersSent) next(error);
  // delete uploaded files first
  if (req.files) {
    if (Array.isArray(req.files)) {
      for (const file of req.files) {
        deleteFile(file);
      }
    } else {
      for (const files of Object.values(req.files)) {
        if (Array.isArray(files)) {
          for (const file of files) {
            deleteFile(file);
          }
        }
      }
    }
  }
  if (req.file) {
    deleteFile(req.file);
  }

  let message = error?.name || "Internal server error!";
  let errorMessages: IErrorMessages[] = [
    { path: req.originalUrl, message: error?.message },
  ];
  if (error instanceof PrismaClientKnownRequestError) {
    const simplifiedError = formatPrismaClientKnownError(error, req);
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof PrismaClientValidationError) {
    const simplifiedError = formatPrismaValidationError(error, req);
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = formatZodError(error);
    message = simplifiedError?.message;
    errorMessages = simplifiedError.errorMessages;
  }

  sendResponse({
    res,
    success: false,
    message,
    data: error?.data,
    statusCode: error?.statusCode || 500,
    errorMessages,
  });
};
