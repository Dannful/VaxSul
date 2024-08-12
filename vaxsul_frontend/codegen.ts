import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/graphql",

  documents: ["src/**/*.{ts,tsx}"],

  generates: {
    "./src/__generated__/": {
      preset: "client",

      plugins: [
        // "typescript-operations",
        // "typescript-react-apollo",
        // "typescript",
      ],

      presetConfig: {
        fragmentMasking: false,
        gqlTagName: "gql",
      },
    },
  },

  ignoreNoDocuments: true,
};

export default config;
