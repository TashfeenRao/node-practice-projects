import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const verifyPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const protect = (req: any, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "un authenticated" });
    return;
  }

  const [, token] = bearer?.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "In valid token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: "Token verification failed" });
  }
};
