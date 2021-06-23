import { Request, Response, NextFunction } from "express";
export function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const admin = true;

  if (admin) {
    return next();
  }

  return response.status(403).json({
    message: "You are not an administrator!",
  });
}
