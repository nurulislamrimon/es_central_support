import { RequestHandler } from "express";
import { mailTemplateService } from "./mailTemplate.service";
import { sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";
import { ApiError } from "../../../utils/ApiError";
import { Mail_template } from "@prisma/client";

/**
 *@api{GET}/ GET Request.
 *@apiDescription This is a GET request for / api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody none
 *@apiParam none
 *@apiQuery fieldName, limit,sort,page
 *@apiSuccess Array - Array of mailTemplates
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const getAllMailTemplate: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await mailTemplateService.getAllMailTemplate(req);
    sendResponse({
      res,
      success: true,
      message: "mailTemplate retrieved successfully!",
      data: result.mailTemplates,
      // meta: result.meta,
      statusCode: 200,
    });
  }
);

/**
 *@api{POST}/add POST Request.
 *@apiDescription This is a POST request for /add api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody Object - mailTemplate data
 *@apiParam none
 *@apiQuery none,
 *@apiSuccess Object - mailTemplate data
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const addMailTemplate: RequestHandler = catchAsync(async (req, res) => {
  const newMailTemplate = req.body;

  const result = await mailTemplateService.addMailTemplate({
    data: newMailTemplate,
  });
  if (!result) {
    throw new ApiError(404, "Something went wrong");
  }
  sendResponse<Partial<Mail_template>>({
    res,
    success: true,
    message: "mailTemplate added successfully!",
    data: result,
    statusCode: 200,
  });
});

/**
 *@api{POST}/delete/:id DELETE Request.
 *@apiDescription This is a DELETE request for /delete/:id api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody Object - mailTemplate data
 *@apiParam none
 *@apiQuery none,
 *@apiSuccess Object - mailTemplate data
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const deleteMailTemplate: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const isExist = await mailTemplateService.getAMailTemplate({
    where: { id: parseInt(id) },
  });

  if (!isExist) {
    throw new ApiError(404, "mailTemplate not found!");
  }

  const result = await mailTemplateService.deleteMailTemplate({
    where: { id: parseInt(id) },
  });
  if (!result) {
    throw new ApiError(404, "Something went wrong");
  }
  sendResponse<Partial<Mail_template>>({
    res,
    success: true,
    message: "mailTemplate added successfully!",
    data: result,
    statusCode: 200,
  });
});

// export mailTemplate controller
export const mailTemplateController = {
  getAllMailTemplate,
  addMailTemplate,
  deleteMailTemplate,
};
