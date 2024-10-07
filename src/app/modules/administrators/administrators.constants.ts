import { Administrator, Prisma } from "@prisma/client";

export const administratorFilterableFields: (keyof Administrator)[] = [
  "full_name",
];
export const administratorSearchableFields: (keyof Administrator)[] = [
  "full_name",
  "email",
];

// ------------------------------------
// select fields
// ------------------------------------

type AdministratorSelectedFields = {
  [key in keyof Partial<Prisma.AdministratorGetPayload<{}>>]: boolean;
};

export const administratorSelectedFields: AdministratorSelectedFields = {
  id: true,
  full_name: true,
  phone_number: true,
  email: true,
  role: true,
  //   password:true,
  address: true,
  created_at: true,
  //   updated_at:true,
  //   deleted_at:true,
};
