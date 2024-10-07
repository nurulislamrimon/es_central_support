import { Administrator } from "@prisma/client";

export const administratorFilterableFields: (keyof Administrator)[] = [
  "full_name",
];
export const administratorSearchableFields: (keyof Administrator)[] = [
  "full_name",
  "email",
];
