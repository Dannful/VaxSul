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
import { gql } from "@/__generated__";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export const vaxSulApi = createApi({
  reducerPath: "vaxSulApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env("NEXT_PUBLIC_VAXSUL_SERVER_URL"),
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["user", "purchase", "vaccine"],
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
  useUpdateUserMutation,
  useGetCurrentUserQuery,
} = vaxSulApi;

const VACCINE_FRAGMENT = gql(`
  fragment IdVaccine on IdVaccine {
    id
    description
    dose
    name
    pricePerUnit
    amountInStock
    research {
      id
      name
      progress
      laboratory {
        id
        name
      }
    }
  }
`);

const PURCHASE_FRAGMENT = gql(`
  fragment IdPurchase on IdPurchase {
    id
    user {
      id
    }
    vaccine {
      id
      name
      description
    }
    amount
    timestamp
    totalSpent
    status
  }
`);

const RESEARCH_FRAGMENT = gql(`
  fragment IdResearch on IdResearch {
    id
    status
    progress
    name
    description
    report
    startDate
    laboratory {
      id
      name
    }
  }
`);

export const SEARCH_VACCINES = gql(`
  query SearchVaccine($vaccineQuery: VaccineQuery!) {
    searchVaccine(vaccineQuery: $vaccineQuery) {
      count
      vaccines {
        ...IdVaccine
      }
    }
  }
`);

export const VACCINE_BY_ID = gql(`
  query VaccineById($id: Int!) {
    vaccine(id: $id) {
      ...IdVaccine
    }
  }
`);

export const UPDATE_VACCINE = gql(`
  mutation UpdateVaccine($id: Int!, $vaccine: Vaccine!) {
    updateVaccine(id: $id, vaccine: $vaccine) {
      ...IdVaccine
    }
  }
`);

export const NEW_VACCINE = gql(`
  mutation NewVaccine($vaccine: Vaccine!) {
    newVaccine(vaccine: $vaccine) {
      ...IdVaccine
    }
  }
`);

export const DELETE_VACCINE = gql(`
  mutation DeleteVaccine($id: Int!) {
    deleteVaccine(id: $id) {
      id
    }
  }
`);

export const NEW_PURCHASE = gql(`
  mutation NewPurchase($purchase: Purchase!) {
    newPurchase(purchase: $purchase) {
      ...IdPurchase
    }
  }
`);

export const NEW_RESEARCH = gql(`
  mutation NewResearch($research: Research!) {
    newResearch(research: $research) {
      ...IdResearch
    }
  }
`);

export const UPDATE_RESEARCH = gql(`
  mutation UpdateResearch($id: Int!, $research: Research!) {
    updateResearch(id: $id, research: $research) {
      ...IdResearch
    }
  }
`);

export const RESEARCHES_QUERY = gql(`
  query Researches {
    researches {
      ...IdResearch
    }
  }
`);

export const RESEARCH_BY_ID = gql(`
  query ResearchById($id: Int!) {
    research(id: $id) {
      ...IdResearch
    }
  }
`);
