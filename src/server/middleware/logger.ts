import debug from "debug";
import express from "express";

const log = debug("app:middleware:logger");

export function logger(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  log(
    JSON.stringify({
      body: req.body,
      method: req.method,
      url: req.url,
    })
  );

  return next();
}
