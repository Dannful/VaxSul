import { Credentials } from "@/types/credentials";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vaxSulApi = createApi({
  reducerPath: "vaxSulApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_VAXSUL_SERVER_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<string, Credentials>({
      query: (credentials: Credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        responseHandler: "text",
      }),
    }),
  }),
});

export const { useLoginMutation } = vaxSulApi;
