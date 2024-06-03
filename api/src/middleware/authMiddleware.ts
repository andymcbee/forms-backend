import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ message: "API key is required" });
  }

  if (apiKey !== process.env.SUPER_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next();
};
