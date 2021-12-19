import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export function requiredAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
}
