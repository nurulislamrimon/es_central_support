import { RequestHandler } from "express";
import { mailTemplateService } from "./mailTemplate.service";
import { sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";
import { ApiError } from "../../../utils/ApiError";
import { Mail_template } from "@prisma/client";
import prisma from "../../../orm";
import { deleteFile } from "../../../lib/file/deleteFiles";

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
      message: "Mail Template retrieved successfully!",
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
  const file = req.file;
  const uploadedFolder = req.uploadedFolder;
  req.body = {
    ...req.body,
    template_name: file?.originalname,
    template_type: file?.mimetype,
    template_path: uploadedFolder + "/" + file?.filename,
    is_active: true,
  };

  // update previous active one
  const result = await prisma.$transaction(async (prisma) => {
    await mailTemplateService.updateMailTemplates({
      where: { is_active: true },
      data: { is_active: false },
    });
    const result = await mailTemplateService.addMailTemplate({
      data: req.body,
    });
    return result;
  });

  // handle add and update using transaction

  if (!result) {
    throw new ApiError(404, "Something went wrong");
  }
  sendResponse<Partial<Mail_template>>({
    res,
    success: true,
    message: "Mail Template added successfully!",
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
    throw new ApiError(404, "Mail Template not found!");
  }

  const result = await mailTemplateService.deleteMailTemplate({
    where: { id: parseInt(id) },
  });

  if (!result) {
    throw new ApiError(404, "Something went wrong");
  }

  deleteFile(result.template_path);

  sendResponse<Partial<Mail_template>>({
    res,
    success: true,
    message: "Mail Template deleted successfully!",
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
