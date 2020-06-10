import { print, printSchema } from "graphql";
import { join, dirname } from "path";
import { GraphQLModule } from "@graphql-modules/core";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { moduleB } from "@graphqlmodules-test/module-b";

const file = loadFilesSync(join(dirname(__dirname), "./c.graphql"));
const typeDefs = mergeTypeDefs(file);
console.log("typeDefs C in (loadFiles and merge):");
console.log(print(typeDefs));
console.log("\n");

// const typeDefs2 = loadSchemaSync(
//   [
//     join(dirname(__dirname), "./c.graphql"),
//     join(dirname(dirname(__dirname)), "./moduleA/a.graphql"), //this line won't help here as in Module B, always error: "Couldn't find type Contact in any of the schemas"
//     join(dirname(dirname(__dirname)), "./moduleB/b.graphql"), //this line won't help here as in Module B, always error: "Couldn't find type Contact in any of the schemas"t
//   ],
//   {
//     loaders: [new GraphQLFileLoader()],
//     assumeValid: true, // seems to have no influence on the above error
//     assumeValidSDL: true, // seems to have no influence on the above error
//   }
// );
// console.log("typeDefs C in (loadSchema)");
// console.log(printSchema(typeDefs2));
// console.log("\n");

export const moduleC = new GraphQLModule({
  name: "moduleC",
  typeDefs,
  imports: [moduleB],
});
export const schema = moduleC.schema;

console.log("typeDefs C out");
console.log(print(moduleC.typeDefs));
console.log("\n");
