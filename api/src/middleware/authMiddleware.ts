import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];
  console.log("Api key::");
  console.log(apiKey);
  console.log(process.env.SUPER_KEY);

  if (!apiKey) {
    return res.status(401).json({ message: "API key is required" });
  }

  if (apiKey !== process.env.SUPER_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next();
};
