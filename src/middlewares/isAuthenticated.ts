import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IAuth {
  auth: {
    id: string;
    name: string;
    email: string;
    admin: boolean;
  };
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { auth } = verify(token, "82a9bd140c4ece1bcfd076dffddfcd75") as IAuth;
    request.auth = auth;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
