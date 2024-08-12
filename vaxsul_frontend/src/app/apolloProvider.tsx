"use client";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { env } from "next-runtime-env";
import React from "react";

const link = createHttpLink({
  uri: `${env("NEXT_PUBLIC_VAXSUL_SERVER_URL")}/graphql`,
  credentials: "include",
  fetchOptions: {
    mode: "cors",
  },
});

export function WithApolloClient({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider
      client={
        new ApolloClient({
          cache: new InMemoryCache(),
          link,
        })
      }
    >
      {children}
    </ApolloProvider>
  );
}
