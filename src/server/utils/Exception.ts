import { STATUS_CODES } from "http";

type ExceptionProps = {
	code: number;
	errors?: any[] | any;
	expose?: boolean;
	message?: string;
	status?: "ok" | "nok";
	stack?: any;
};

export class Exception extends Error {
	code: number;
	errors?: any[] | any;
	message: string;
	status?: "ok" | "nok";

	constructor(args: ExceptionProps) {
		let message = args.message;
		if (!message || !args.expose) {
			message = STATUS_CODES[args.code] as string;
		}
		super(message);

		Object.setPrototypeOf(this, new.target.prototype);
		this.code = args.code ?? 500;
		this.message = message;
		this.name = this.constructor.name;
		this.status = args.code < 300 ? "ok" : "nok";
	}
}
