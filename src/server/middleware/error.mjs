import debug from "debug";

import { Exception } from "../utils/index.mjs";

const log = debug("app:middleware:error");

function handler(err, req, res, next) {
  log(err);

  if (res.headersSent) {
    return next(err);
  }

  let { code } = err;
  if (isNaN(code)) {
    code = 500;
  }
  res.status(code).send(err);
}

function middleware(methods = []) {
  return (req, res, next) => {
    let e = new Exception({ code: 404 });
    if (methods && !methods.includes(req.method)) {
      e = new Exception({ code: 405 });
    }
    next(e);
  };
}

export function error(methods) {
  return [middleware(methods), handler];
}
