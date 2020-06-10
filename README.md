# graphqlmodules-test

There seem to be several bugs within `@graphql-tools/loadSchemaSync`:

- if a graphql type is imported from another schema there might be transient dependencies (i.e. types of a union). In the case demonstrated here, it's the union itself that seems to be ignored.
- combined with graphql-modules it might be useful not to validate the types and merge missing types from an imported module. The not yet documented options `assumeValid` and `assumeValid`
  might help here, however seem to have no effect yet.

The "less comfortable" way of loading the graphql files using `@graphql-tools/loadFilesSync` combined with `@graphql-tools/merge` seem to work as expected.

The sync getters `GraphQLModule.schema` and `GraphQLModule.typeDefs` seem to work unreliable:
When used in combination with `graphql/print` or `graphql/printSchema` the results are often incomplete.
