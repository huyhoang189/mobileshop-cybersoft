const express = require("express");
const app = express();

const { graphqlHTTP } = require("express-graphql");
const schemaAdmin = require("./schema/admin/index");

app.use(
  "/api/v1/admin/graphql",
  graphqlHTTP({
    schema: schemaAdmin,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("listent port 3000");
});
