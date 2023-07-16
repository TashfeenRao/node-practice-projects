import { User } from "@prisma/client";
import { notEqual } from "assert";
import { Response } from "express";
import { prisma } from "../db/prismaConnection";

export const getUsers = async (req: any, res: Response) => {
  const users: [User] = (await prisma.user.findMany()) as [User];

  if (!users) {
    res.status(401);
    res.json({ message: "could not find the user" });
    return;
  }

  const filteredUsers = users.map(({ id, username, createdAt }) => ({
    id,
    username,
    createdAt,
  }));

  return res.json({ data: filteredUsers });
};

export const getUser = async (req: any, res: Response) => {
  const userId = req.params.id;
  console.log(userId);
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    res.status(401);
    res.json({ message: "could not find the user" });
    return;
  }

  const { id, username } = user;

  return res.json({ data: { id, username } });
};

export const getCurrentUser = async (req: any, res: Response) => {
  const tokenUser: User = req.user;

  const currentUser: User = (await prisma.user.findFirst({
    where: {
      username: tokenUser.username,
    },
  })) as User;

  const { id, username, createdAt } = currentUser;

  res.json({ data: { id, username, createdAt } });
};
