import { Response } from "express";
import { prisma } from "../db/prismaConnection";

export const updateCreate = async (req: any, res: Response) => {
  const { status, version, asset, productId } = req.body;
  const update = await prisma.update.create({
    data: {
      status,
      version,
      asset,
      productId,
    },
  });

  res.json({ data: update });
};

export const updatePut = async (req: any, res: Response) => {
  const updateId = req.params.id;
  const { status, version, asset, productId } = req.body;
  const update = await prisma.update.update({
    where: {
      id: updateId,
    },
    data: {
      status,
      version,
      asset,
      productId,
    },
  });

  res.json({ data: update });
};

export const updateGet = async (req: any, res: Response) => {
  const updateId = req.params.id;

  const update = await prisma.update.findFirst({
    where: {
      id: updateId,
    },
  });
  res.json({ data: update });
};

export const updateDelete = async (req: any, res: Response) => {
  const updateId = req.params.id;
  const update = await prisma.update.delete({
    where: {
      id: updateId,
    },
  });
  res.json({ data: update });
};

export const updateList = async (req: any, res: Response) => {
  const updates = await prisma.update.findMany();
  res.json({ data: updates });
};
