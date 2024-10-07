import { Administrator } from "@prisma/client";
import jwt from "jsonwebtoken";

export const generateToken = (
  user: Administrator,
  tokenSecret: string,
  expiresIn: string
) => {
  // generate token using mail and role
  const token = jwt.sign({ email: user.email, role: user.role }, tokenSecret, {
    expiresIn,
  });

  return token;
};
