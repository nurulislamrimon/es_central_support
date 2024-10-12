import { Prisma } from "@prisma/client";

export interface IModelMappingsForWhere {
  Administrator: Prisma.AdministratorWhereInput;
  Help_request: Prisma.Help_requestWhereInput;
  Mail_template: Prisma.Mail_templateWhereInput;
  Mailing: Prisma.MailingWhereInput;
}
