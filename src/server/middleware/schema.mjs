import Ajv from "ajv";

import { Exception } from "../utils/index.mjs";

const ajv = new Ajv({ allErrors: true });

export function schema(schema) {
  return (req, res, next) => {
    if ("schema" in req.query) {
      res.status(200).send(schema);

      return;
    }

    if (
      !["DELETE", "GET", "HEAD", "OPTIONS"].includes(req.method) &&
      !ajv.validate(schema, req.body)
    ) {
      return next(
        new Exception({
          code: 400,
          errors: ajv.errors,
          expose: true,
          message: "Schema validation error",
        })
      );
    }

    return next();
  };
}
