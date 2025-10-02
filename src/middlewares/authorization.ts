import type { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES } from "../helpers/errors.js";

interface AuthRequest extends Request {
  user: {
    id: number;
    role: string;
  } | null;
}

export class Authorization {
  static isAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).json(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
    }
    next();
  }
  static isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.user?.role !== "admin") {
      return res.status(403).json(ERROR_MESSAGES.AUTH.ROLE.FORBIDDEN);
    }
    next();
  }
}
