import { join, dirname } from "path";
import { GraphQLModule } from "@graphql-modules/core";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { moduleA } from "@graphqlmodules-test/module-a";

export const moduleB = new GraphQLModule({
  name: "moduleB",
  typeDefs: loadSchemaSync(
    [
      join(dirname(__dirname), "./b.graphql"),
      join(dirname(dirname(__dirname)), "./moduleA/a.graphql"),
    ],
    {
      loaders: [new GraphQLFileLoader()],
    }
  ),
  imports: [moduleA],
});

export const schema = moduleB.schema;
console.log(schema);
console.log(moduleB.typeDefs);
