import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { env, PublicEnvScript } from "next-runtime-env";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WithApolloClient } from "./apolloProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VaxSul",
  description:
    "Uma plataforma para facilitar pesquisa, produção e aquisição de vacinas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <StoreProvider>
        <WithApolloClient>
          <body className={inter.className}>{children}</body>
        </WithApolloClient>
      </StoreProvider>
    </html>
  );
}
