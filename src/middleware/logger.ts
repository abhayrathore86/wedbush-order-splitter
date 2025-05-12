import { Request, Response, NextFunction } from "express";

export function logResponseTime(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = process.hrtime();

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const milliseconds = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${
        req.originalUrl
      } - ${milliseconds} ms`
    );
  });

  next();
}
