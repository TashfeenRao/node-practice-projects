import { hashPassword } from "./authUtils";
import { Request, Response } from "express";
import { createJWT, verifyPassword } from "./authUtils";
import { prisma } from "../db/prismaConnection";

export const signUp = async (req: any, res: any, next: any) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    if (!user) {
      res.status(400);
      res.json({ message: "could not create the user" });
    }
    const token = createJWT(user);
    return res.json({ token });
  } catch (error: any) {
    error.type = "input";
    next(error);
  }
};

export const signIn = async (req: any, res: Response, next: any) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      },
    } as any);
    if (!user) {
      throw new Error("user not found");
    }
    if (!verifyPassword(req.body.password, user.password)) {
      res.status(401);
      res.json({ message: "invalid password" });
      return;
    }

    const token = createJWT(user);
    return res.json({ token });
  } catch (error: any) {
    error.type = "handler";
    next(error);
  }
};
