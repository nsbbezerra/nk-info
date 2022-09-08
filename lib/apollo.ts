import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.URI_GRAPHQL,
  cache: new InMemoryCache(),
});
