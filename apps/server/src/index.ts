import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { GraphQLError } from 'graphql';
import Session from "supertokens-node/recipe/session";
import supertokens from "supertokens-node";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import { errorHandler } from "supertokens-node/framework/express";

supertokens.init({
    framework: "express",
    supertokens: {
        // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
        connectionURI: "https://try.supertokens.com",
        // apiKey: <API_KEY(if configured)>,
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "next-app",
        apiDomain: "http://localhost:4000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/api/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        ThirdParty.init({/*TODO: See next step*/}),
        Session.init() // initializes session features
    ]
});

let app = express();

app.use(cors({
    origin: "http://localhost:4000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(errorHandler());

const typeDefs = '...'
const resolvers = {/* ... */ }

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.start().then(() => {
    app.use(express.json(), expressMiddleware(server, {

        // Note: This example uses the `req` and `res` argument to access headers,
        // but the arguments received by `context` vary by integration.
        // This means they vary for Express, Fastify, Lambda, etc.
        context: async ({ req, res }) => {
            try {
                let session = await Session.getSession(req, res, {
                    sessionRequired: false
                })
                return {
                    userId: session !== undefined ? session.getUserId() : undefined
                };
            } catch (err) {
                if (Session.Error.isErrorFromSuperTokens(err)) {
                    throw new GraphQLError('Session related error', {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                            http: { status: err.type === Session.Error.INVALID_CLAIMS ? 403 : 401 },
                        },
                    });
                }
                throw err;
            }
        },
    }))

    app.listen(3001, () => {
        console.log("Server started");
    })
})