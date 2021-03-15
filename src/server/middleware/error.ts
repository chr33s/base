import debug from "debug";
import express from "express";

import { Exception, ExceptionProps } from "../utils/index";

const log = debug("app:middleware:error");

function handler(
  err: ExceptionProps,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  log(err);

  if (res.headersSent) {
    return next(err);
  }

  let code = parseInt(`${err.code}`);
  if (isNaN(code)) {
    code = 500;
  }
  res.status(code).send(err);
}

function middleware(methods: string[] = []) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let e = new Exception({ code: 404 });
    if (methods && !methods.includes(req.method)) {
      e = new Exception({ code: 405 });
    }
    next(e);
  };
}

export function error(methods?: string[]): any[] {
  return [middleware(methods), handler];
}
