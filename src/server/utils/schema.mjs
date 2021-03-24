import { buildSchema } from "graphql";

import schemaString from "../schema.gql";

const schema = buildSchema(schemaString);

const rootValue = {
  hello: () => "Hello world!",
};

export { rootValue, schema };
