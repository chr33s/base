import { STATUS_CODES } from "http";

import { ExceptionProps } from "../types";

export class Exception extends Error {
  constructor({ expose, ...args }: ExceptionProps) {
    super();

    args.code = args.code || 500;
    args.message = (expose && args.message) || STATUS_CODES[args.code];
    args.status = args.code < 300 ? "ok" : "error";

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    Object.assign(this, args);
  }
}

export { ExceptionProps };
