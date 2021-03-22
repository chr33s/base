import debug from "debug";
import express from "express";
import { graphqlHTTP } from "express-graphql";

import { rootValue, schema } from "./utils/schema.mjs";

const log = debug("server");

const server = express();

server.use(express.json());

const isDevelopment = process.env.NODE_ENV !== "production";
server.use(
  "/graphql",
  graphqlHTTP({
    graphiql: isDevelopment,
    pretty: true,
    rootValue,
    schema,
  })
);

const PORT = process.env.PORT || 8080;
export default server.listen(PORT, () => {
  log(`:${PORT}/`);
});
