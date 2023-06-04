import debug from "debug";
import express from "express";

import { Exception } from "../utils/Exception";

const log = debug("server:middleware:error");

function handler(
	err: Exception,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	log(err);

	if (res.headersSent) {
		return next(err);
	}

	const code = isNaN(err.code) ? 500 : err.code;
	res.status(code).send(err);
}

function middleware(methods: string[] = []) {
	return (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		if (!methods?.includes(req.method)) {
			next(new Exception({ code: 405 }));
		} else {
			next(new Exception({ code: 404 }));
		}
	};
}

export function error(methods: string[] = []) {
	return [middleware(methods), handler];
}
