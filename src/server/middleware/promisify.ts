import express from "express";

export function promisify(fn: (...args: any) => any) {
	return (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	): any => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}
