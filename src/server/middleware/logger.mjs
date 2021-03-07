import debug from "debug";

const log = debug("app:middleware:logger");

export function logger(req, res, next) {
  log(
    JSON.stringify({
      body: req.body,
      method: req.method,
      url: req.url,
    })
  );

  return next();
}
