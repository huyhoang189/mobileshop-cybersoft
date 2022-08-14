const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// const { ApolloServer, gql } = require("apollo-server");
app.use(bodyParser({ limit: "50mb" }));
const schemaAdmin = require("./schema/admin/index");
const schemaUser = require("./schema/user/index");
const PORT = process.env.PORT || 5000;
// console.log(process.env);

const { graphqlHTTP } = require("express-graphql");
const { authenticate } = require("./middlewares/auth/authenticate.auth");
app.use(cors());
app.use(
  "/api/v1/admin",
  authenticate,
  graphqlHTTP({
    schema: schemaAdmin,
    graphiql: true,
  })
);

app.use(
  "/api/v1/user",
  graphqlHTTP({
    schema: schemaUser,
    graphiql: true,
  })
);

app.listen(PORT, async () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
