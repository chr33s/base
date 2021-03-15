import express from "express";

export function promisify(
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => any
) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
