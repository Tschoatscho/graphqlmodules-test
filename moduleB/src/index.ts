import { print, printSchema } from "graphql";
import { join, dirname } from "path";
import { GraphQLModule } from "@graphql-modules/core";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { moduleA } from "@graphqlmodules-test/module-a";

const file = loadFilesSync(join(dirname(__dirname), "./b.graphql"));
const typeDefs = mergeTypeDefs(file);
console.log("typeDefs B in (loadFiles and merge):");
console.log(print(typeDefs));
console.log("\n");

const typeDefs2 = loadSchemaSync(
  [
    join(dirname(__dirname), "./b.graphql"),
    join(dirname(dirname(__dirname)), "./moduleA/a.graphql"), //remove this line and get error: "Unknown type \"Contact\"" at tryToLoadFromExport
  ],
  {
    loaders: [new GraphQLFileLoader()],
    assumeValid: true, // seems to have no influence on the above error
    assumeValidSDL: true, // seems to have no influence on the above error
  }
);
console.log("typeDefs B in (loadSchema)");
console.log(printSchema(typeDefs2));
console.log("\n");

export const moduleB = new GraphQLModule({
  name: "moduleB",
  typeDefs,
  imports: [moduleA],
});

console.log("typeDefs B out");
console.log(print(moduleB.typeDefs));

export const schema = moduleB.typeDefs;
