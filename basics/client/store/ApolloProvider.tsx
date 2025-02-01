"use client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloClientProvider,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
  );
};
