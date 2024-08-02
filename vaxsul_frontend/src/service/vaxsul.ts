import { Credentials } from "@/types/credentials";
import { User } from "@/types/user";
import { Vaccine, VaccineSchema, VaccineSearch } from "@/types/vaccine";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "next-runtime-env";

export const vaxSulApi = createApi({
  reducerPath: "vaxSulApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env("NEXT_PUBLIC_VAXSUL_SERVER_URL"),
    credentials: "include",
    mode: "cors",
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
    register: builder.mutation<string, User>({
      query: (credentials: User) => ({
        url: "register",
        method: "POST",
        body: credentials,
        responseHandler: "text",
      }),
    }),
    searchVaccine: builder.mutation<Vaccine[], VaccineSearch>({
      query: (vaccineSearch) => ({
        url: "vaccines",
        params: {
          minimumPrice: vaccineSearch.minimumPrice,
          maximumPrice: vaccineSearch.maximumPrice,
          name: vaccineSearch.name,
        },
      }),
      transformResponse: (response) => VaccineSchema.array().parse(response),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSearchVaccineMutation,
} = vaxSulApi;
