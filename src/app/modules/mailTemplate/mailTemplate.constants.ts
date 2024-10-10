import { Mail_template, Prisma } from "@prisma/client";

export const mailTemplateFilterableFields: (keyof Mail_template)[] = [
  "id",
  "template_name",
  "template_type",
  "template_path",
  "is_active",
  "created_at",
  "updated_at",
  "deleted_at",
];
export const mailTemplateSearchableFields: (keyof Mail_template)[] = [
  "template_name",
  "template_type",
  "template_path",
];

// ------------------------------------
// select fields
// ------------------------------------

type Mail_templateSelectedFields = {
  [key in keyof Partial<Prisma.Mail_templateGetPayload<{}>>]: boolean;
};

export const mailTemplateSelectedFields: Mail_templateSelectedFields = {
  id: true,
  template_name: true,
  template_type: true,
  template_path: true,
  is_active: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
};
