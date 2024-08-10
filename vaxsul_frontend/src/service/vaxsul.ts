import { Credentials } from "@/types/credentials";
import { User } from "@/types/user";
import { Purchase, PurchaseSearch, PurchaseSchema } from "@/types/purchase";
import { Vaccine, VaccineSchema, VaccineSearch } from "@/types/vaccine";
import { Research } from "@/types/research";
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
    searchVaccine: builder.mutation<Vaccine[], VaccineSearch>({
      query: (vaccineSearch) => ({
        url: "vaccines",
        params: {
          minimumPrice: vaccineSearch.minimumPrice,
          maximumPrice: vaccineSearch.maximumPrice,
          name: vaccineSearch.name,
          id: vaccineSearch.id,
        },
      }),
      transformResponse: (response) => VaccineSchema.array().parse(response),
    }),
    getPurchase: builder.mutation<Purchase[], PurchaseSearch>({
      query: (PurchaseSearch) => ({
        url: "purchase",
        params: {
          userId: PurchaseSearch.userId,
        },
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
    getAllVaccines: builder.query<Vaccine[], void>({
      query: () => "vaccines",
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
<<<<<<< Updated upstream
  useGetAllVaccinesQuery,
=======
  useGetPurchaseMutation,
>>>>>>> Stashed changes
} = vaxSulApi;
