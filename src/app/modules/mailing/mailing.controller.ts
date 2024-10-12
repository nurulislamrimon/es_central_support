import { RequestHandler } from "express";
import { mailingService } from "./mailing.service";
import { sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";
import { ApiError } from "../../../utils/ApiError";
import { Mailing } from "@prisma/client";

/**
 *@api{GET}/ GET Request.
 *@apiDescription This is a GET request for / api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody none
 *@apiParam none
 *@apiQuery fieldName, limit,sort,page
 *@apiSuccess Array - Array of mailings
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const getAllMailing: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await mailingService.getAllMailing(req);
  sendResponse({
    res,
    success: true,
    message: "mailing retrieved successfully!",
    data: result.mailings,
    // meta: result.meta,
    statusCode: 200,
  });
});

/**
 *@api{POST}/add POST Request.
 *@apiDescription This is a POST request for /add api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody Object - mailing data
 *@apiParam none
 *@apiQuery none,
 *@apiSuccess Object - mailing data
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const addMailing: RequestHandler = catchAsync(async (req, res) => {
  const newMailing = req.body;

  const result = await mailingService.addMailing({
    data: newMailing,
  });
  if (!result) {
    throw new ApiError(404, "Something went wrong");
  }
  sendResponse<Partial<Mailing>>({
    res,
    success: true,
    message: "Mailing added successfully!",
    data: result,
    statusCode: 200,
  });
});

/**
 *@api{POST}/delete/:id DELETE Request.
 *@apiDescription This is a DELETE request for /delete/:id api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody Object - mailing data
 *@apiParam none
 *@apiQuery none,
 *@apiSuccess Object - mailing data
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const deleteMailing: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const isExist = await mailingService.getAMailing({
    where: { id: parseInt(id) },
  });

  if (!isExist) {
    throw new ApiError(404, "mailing not found!");
  }

  const result = await mailingService.deleteMailing({
    where: { id: parseInt(id) },
  });
  if (!result) {
    throw new ApiError(404, "Something went wrong");
  }
  sendResponse<Partial<Mailing>>({
    res,
    success: true,
    message: "Mailing deleted successfully!",
    data: result,
    statusCode: 200,
  });
});

// export mailing controller
export const mailingController = {
  getAllMailing,
  addMailing,
  deleteMailing,
};
