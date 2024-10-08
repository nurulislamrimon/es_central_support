import { Help_request, Prisma } from "@prisma/client";

export const helpRequestFilterableFields: (keyof Help_request)[] = [
  "client_name",
];
export const helpRequestSearchableFields: (keyof Help_request)[] = [
  "client_name",
  "email",
];

// ------------------------------------
// select fields
// ------------------------------------

type Help_requestSelectedFields = {
  [key in keyof Partial<Prisma.Help_requestGetPayload<{}>>]: boolean;
};

export const helpRequestSelectedFields: Help_requestSelectedFields = {
  id: true,
  platform_name: true,
  client_name: true,
  phone_number: true,
  email: true,
  budget_min: true,
  budget_max: true,
  project_description: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
};
