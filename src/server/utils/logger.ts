import pino from "pino";

const transport = pino.transport({
	target: "@logtail/pino",
	options: {
		level: process.env.LOG_LEVEL ?? "silent",
		sourceToken: process.env.LOGTAIL_TOKEN ?? "",
	},
});
transport.on("error", (err: Error) => {
	console.error("logger", err);
});
export const logger = pino(transport);
