import { Response } from "express";
import { prisma } from "../db/prismaConnection";

export const productCreate = async (req: any, res: Response) => {
  const { name } = req.body;
  const user = req.user;
  const product = await prisma.product.create({
    data: {
      name: name,
      userId: user.id,
    },
  });

  res.json({ data: product });
};

export const productPut = async (req: any, res: Response) => {
  const productId = req.params.id;
  const { name: newName } = req.body;
  const product = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: newName,
    },
  });

  res.json({ data: product });
};

export const productGet = async (req: any, res: Response) => {
  const productId = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });
  res.json({ data: product });
};

export const productDelete = async (req: any, res: Response) => {
  const productId = req.params.id;
  const product = await prisma.product.delete({
    where: {
      id: productId,
    },
  });
  res.json({ data: product });
};

export const productList = async (req: any, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      userId: req.user.id,
    },
  });
  res.json({ data: products });
};
