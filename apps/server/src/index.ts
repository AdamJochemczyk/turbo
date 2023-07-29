import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { GraphQLError } from "graphql";
import { startStandaloneServer } from "@apollo/server/standalone";

let app = express();

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
const resolvers = {
  Query: {
    books: () => [],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(url=>console.log);

app.listen(4001, () => {
  console.log("Server started");
});

// server.start().then(() => {
//     app.use(express.json(), expressMiddleware(server, {

//         // Note: This example uses the `req` and `res` argument to access headers,
//         // but the arguments received by `context` vary by integration.
//         // This means they vary for Express, Fastify, Lambda, etc.
//         context: async ({ req, res }) => {
//             try {
//                 let session = await Session.getSession(req, res, {
//                     sessionRequired: false
//                 })
//                 return {
//                     userId: session !== undefined ? session.getUserId() : undefined
//                 };
//             } catch (err) {
//                 if (Session.Error.isErrorFromSuperTokens(err)) {
//                     throw new GraphQLError('Session related error', {
//                         extensions: {
//                             code: 'UNAUTHENTICATED',
//                             http: { status: err.type === Session.Error.INVALID_CLAIMS ? 403 : 401 },
//                         },
//                     });
//                 }
//                 throw err;
//             }
//         },
//     }))

//     app.listen(4000, () => {
//         console.log("Server started");
//     })
// })
