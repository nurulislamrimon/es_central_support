import { Prisma, Mail_template } from "@prisma/client";
import prisma from "../../../orm";
import { Request } from "express";
import { searchFilterAndPagination } from "../../../utils/searchFilterAndPagination";
import {
  mailTemplateFilterableFields,
  mailTemplateSearchableFields,
  mailTemplateSelectedFields,
} from "./mailTemplate.constants";
import { DefaultArgs } from "@prisma/client/runtime/library";

// -----------------------------
// get all mailTemplates
// -----------------------------
const getAllMailTemplate = async (req: Request) => {
  const query = searchFilterAndPagination<"Mail_template">({
    req,
    filterableFields: mailTemplateFilterableFields,
    searchableFields: mailTemplateSearchableFields,
  });

  const mailTemplates = await prisma.mail_template.findMany({
    where: query.where,
    select: mailTemplateSelectedFields,
    skip: query.skip,
    take: query.limit,
    orderBy: {
      [query.sortBy]: query.sortOrder,
    },
  });

  const total = await prisma.mail_template.count({
    where: query.where,
  });

  return {
    mailTemplates,
    meta: { total, page: query.page, limit: query.limit },
  };
};

// -----------------------------
// add new mailTemplate
// -----------------------------
const addMailTemplate = async ({ data }: { data: Mail_template }) => {
  const mailTemplates = await prisma.mail_template.create({
    data,
  });
  return mailTemplates;
};

// ---------------------------------------------
// get a mailTemplate by query
// ---------------------------------------------
const getAMailTemplate = async (query: Prisma.Mail_templateFindFirstArgs) => {
  const mailTemplates = await prisma.mail_template.findFirst(query);
  return mailTemplates;
};

// -----------------------------
// update an mailTemplate
// -----------------------------
const updateMailTemplates = async (
  data: Prisma.Mail_templateUpdateManyArgs
) => {
  const mailTemplates = await prisma.mail_template.updateMany(data);
  return mailTemplates;
};

// -----------------------------
// update an mailTemplate
// -----------------------------
const updateMailTemplate = async (
  data: Prisma.Mail_templateUpdateArgs<DefaultArgs>
) => {
  const mailTemplates = await prisma.mail_template.update(data);
  return mailTemplates;
};

// -----------------------------
// update an mailTemplate
// -----------------------------
const deleteMailTemplate = async (
  query: Prisma.Mail_templateDeleteArgs<DefaultArgs>
) => {
  const mailTemplates = await prisma.mail_template.delete(query);
  return mailTemplates;
};

// export
export const mailTemplateService = {
  getAllMailTemplate,
  addMailTemplate,
  getAMailTemplate,
  updateMailTemplates,
  updateMailTemplate,
  deleteMailTemplate,
};
