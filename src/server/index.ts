import "./utils/dotenv";
import "./utils/debug";
import debug from "debug";

import app from "./app";

const log = debug("server");

const PORT = process.env.PORT_SERVER;

app.listen(PORT, () => {
	log(`server:${PORT}`);
});
