import { Response } from "express";
import { validationResult } from "express-validator";

export const inputValidator = (req: any, res: Response, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ error: errors.array() });
  } else {
    next();
  }
};
