import { join, dirname } from "path";
import { print, printSchema } from "graphql";
import { GraphQLModule } from "@graphql-modules/core";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const file = loadFilesSync(join(dirname(__dirname), "./a.graphql"));
const typeDefs = mergeTypeDefs(file);
console.log("typeDefs A in (loadFiles and merge):");
console.log(print(typeDefs));
console.log("\n");

const typeDefs2 = loadSchemaSync(join(dirname(__dirname), "./a.graphql"), {
  loaders: [new GraphQLFileLoader()],
});
console.log("typeDefs A in (loadSchema):");
console.log(printSchema(typeDefs2));
console.log("\n");

export const moduleA = new GraphQLModule({
  name: "moduleA",
  typeDefs,
});
export const schema = moduleA.schema;

console.log("typeDefs A out:");
console.log(print(moduleA.typeDefs));
console.log("\n");
