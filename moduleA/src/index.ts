import { join, dirname } from "path";
import { GraphQLModule } from "@graphql-modules/core";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

export const moduleA = new GraphQLModule({
  name: "moduleA",
  typeDefs: loadSchemaSync(join(dirname(__dirname), "./a.graphql"), {
    loaders: [new GraphQLFileLoader()],
  }),
});

export const schema = moduleA.schema;
console.log(schema);
console.log(moduleA.typeDefs);
