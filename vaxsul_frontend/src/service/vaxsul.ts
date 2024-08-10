import { Credentials } from "@/types/credentials";
import { User } from "@/types/user";
import {
  Vaccine,
  VaccineSchema,
  VaccineSearch,
  VaccineSearchResponse,
  VaccineSearchResponseSchema,
  VaccineSearchSchema,
} from "@/types/vaccine";
import { Research } from "@/types/research";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "next-runtime-env";
import { Purchase, PurchaseSchema } from "@/types/purchase";

export const vaxSulApi = createApi({
  reducerPath: "vaxSulApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env("NEXT_PUBLIC_VAXSUL_SERVER_URL"),
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    login: builder.mutation<string, Credentials>({
      query: (credentials: Credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        responseHandler: "text",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST",
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
    searchVaccine: builder.mutation<VaccineSearchResponse, VaccineSearch>({
      query: (vaccineSearch) => ({
        url: "vaccines",
        params: {
          minimumPrice: vaccineSearch.minimumPrice,
          maximumPrice: vaccineSearch.maximumPrice,
          name: vaccineSearch.name,
          count: vaccineSearch.count,
        },
      }),
      transformResponse: (response) =>
        VaccineSearchResponseSchema.parse(response),
    }),
    getPurchases: builder.query<Purchase[], number>({
      query: (number) => ({
        url: `purchase/user/${number}`,
      }),
      transformResponse: (response) => PurchaseSchema.array().parse(response),
    }),
    getVaccineById: builder.query<Vaccine, number>({
      query: (id) => `vaccines/${id}`,
    }),
    getAllResearch: builder.query<Research[], void>({
      query: () => "researches",
    }),
    getResearchById: builder.query<Research, number>({
      query: (id) => `researches/${id}`,
    }),
    newResearch: builder.mutation<Research, Research>({
      query: (research) => ({
        url: "researches/new",
        method: "POST",
        body: research,
      }),
    }),
    newVaccine: builder.mutation<Vaccine, Vaccine>({
      query: (vaccine) => ({
        url: "vaccines/new",
        method: "POST",
        body: vaccine,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => "users/current",
      providesTags: ["user"],
    }),
    updateUser: builder.mutation<void, User>({
      query: (user) => ({
        url: "users/new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: () => ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSearchVaccineMutation,
  useGetVaccineByIdQuery,
  useGetAllResearchQuery,
  useGetResearchByIdQuery,
  useNewResearchMutation,
  useNewVaccineMutation,
  useGetCurrentUserQuery,
  useGetPurchasesQuery,
  useUpdateUserMutation,
} = vaxSulApi;
