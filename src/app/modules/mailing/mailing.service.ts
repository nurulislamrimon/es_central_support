import { Prisma, Mailing } from "@prisma/client";
import prisma from "../../../orm";
import { Request } from "express";
import { searchFilterAndPagination } from "../../../utils/searchFilterAndPagination";
import {
  mailingFilterableFields,
  mailingSearchableFields,
  mailingSelectedFields,
} from "./mailing.constants";
import { DefaultArgs } from "@prisma/client/runtime/library";

// -----------------------------
// get all mailings
// -----------------------------
const getAllMailing = async (req: Request) => {
  const query = searchFilterAndPagination<"Mailing">({
    req,
    filterableFields: mailingFilterableFields,
    searchableFields: mailingSearchableFields,
  });

  const mailings = await prisma.mailing.findMany({
    where: query.where,
    select: mailingSelectedFields,
    skip: query.skip,
    take: query.limit,
    orderBy: {
      [query.sortBy]: query.sortOrder,
    },
  });

  const total = await prisma.mailing.count({
    where: query.where,
  });

  return {
    mailings,
    meta: { total, page: query.page, limit: query.limit },
  };
};

// -----------------------------
// add new mailing
// -----------------------------
const addMailing = async ({ data }: { data: Mailing }) => {
  const mailings = await prisma.mailing.create({
    data,
  });
  return mailings;
};

// ---------------------------------------------
// get a mailing by query
// ---------------------------------------------
const getAMailing = async (query: Prisma.MailingFindFirstArgs) => {
  const mailings = await prisma.mailing.findFirst(query);
  return mailings;
};

// -----------------------------
// update an mailing
// -----------------------------
const updateMailing = async (data: Prisma.MailingUpdateArgs<DefaultArgs>) => {
  const mailings = await prisma.mailing.update(data);
  return mailings;
};

// -----------------------------
// update an mailing
// -----------------------------
const deleteMailing = async (query: Prisma.MailingDeleteArgs<DefaultArgs>) => {
  const mailings = await prisma.mailing.delete(query);
  return mailings;
};

// export
export const mailingService = {
  getAllMailing,
  addMailing,
  getAMailing,
  updateMailing,
  deleteMailing,
};
