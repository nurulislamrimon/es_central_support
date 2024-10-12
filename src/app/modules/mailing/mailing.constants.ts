import { Mailing, Prisma } from "@prisma/client";

export const mailingFilterableFields: (keyof Mailing)[] = [
  "id",
  "receiver_mail",
  "sender",
  "subject",
  "template_path",
  "created_at",
  "updated_at",
];
export const mailingSearchableFields: (keyof Mailing)[] = [
  "receiver_mail",
  "subject",
];

// ------------------------------------
// select fields
// ------------------------------------

type MailingSelectedFields = {
  [key in keyof Partial<Prisma.MailingGetPayload<{}>>]: boolean;
};

export const mailingSelectedFields: MailingSelectedFields = {
  id: true,
  receiver_mail: true,
  sender: true,
  subject: true,
  template_path: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
};
