import { Administrator } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

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

export const verifyToken = (token: string, tokenSecret: string) => {
  try {
    const decoded: JwtPayload | string = jwt.verify(token, tokenSecret);
    return decoded;
  } catch (error) {
    throw error;
  }
};
