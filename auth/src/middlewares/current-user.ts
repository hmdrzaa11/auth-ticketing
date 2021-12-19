import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export function currentUser(req: Request, res: Response, next: NextFunction) {
  //the job of this middleware is only to extract info
  if (!req.session?.jwt) {
    return next(); // we do not throw error because that is another middel
  }

  try {
    let payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}
  next();
}
