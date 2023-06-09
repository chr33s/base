import pinoDebug from "pino-debug";

import { logger } from "./logger";

pinoDebug(logger, {
	auto: true,
	map: {
		"server:*": "debug",
		server: "info",
		"*": "trace",
	},
});
