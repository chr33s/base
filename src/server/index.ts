import "dotenv/config";

import app from "./app";

const PORT = process.env.PORT_SERVER;

app.listen(PORT, () => {
	console.log(`server:${PORT}`);
});
