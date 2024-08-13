/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment IdVaccine on IdVaccine {\n    id\n    description\n    dose\n    name\n    pricePerUnit\n    amountInStock\n    research {\n      id\n      name\n      progress\n      laboratory {\n        id\n        name\n      }\n    }\n  }\n": types.IdVaccineFragmentDoc,
    "\n  fragment IdPurchase on IdPurchase {\n    id\n    user {\n      id\n      name\n    }\n    vaccine {\n      id\n      name\n      description\n    }\n    amount\n    timestamp\n    totalSpent\n    status\n  }\n": types.IdPurchaseFragmentDoc,
    "\n  fragment IdResearch on IdResearch {\n    id\n    status\n    progress\n    name\n    description\n    report\n    startDate\n    laboratory {\n      id\n      name\n    }\n  }\n": types.IdResearchFragmentDoc,
    "\n  query SearchVaccine($vaccineQuery: VaccineQuery!) {\n    searchVaccine(vaccineQuery: $vaccineQuery) {\n      count\n      vaccines {\n        ...IdVaccine\n      }\n    }\n  }\n": types.SearchVaccineDocument,
    "\n  query VaccineById($id: Int!) {\n    vaccine(id: $id) {\n      ...IdVaccine\n    }\n  }\n": types.VaccineByIdDocument,
    "\n  mutation UpdateVaccineStock($id: Int!, $decrement: Int!) {\n    updateVaccineStock(id: $id, decrement: $decrement) {\n      ...IdVaccine\n    }\n  }\n": types.UpdateVaccineStockDocument,
    "\n  mutation UpdateVaccine($id: Int!, $vaccine: Vaccine!) {\n    updateVaccine(id: $id, vaccine: $vaccine) {\n      ...IdVaccine\n    }\n  }\n": types.UpdateVaccineDocument,
    "\n  mutation NewVaccine($vaccine: Vaccine!) {\n    newVaccine(vaccine: $vaccine) {\n      ...IdVaccine\n    }\n  }\n": types.NewVaccineDocument,
    "\n  mutation DeleteVaccine($id: Int!) {\n    deleteVaccine(id: $id) {\n      id\n    }\n  }\n": types.DeleteVaccineDocument,
    "\n  mutation NewPurchase($purchase: Purchase!) {\n    newPurchase(purchase: $purchase) {\n      ...IdPurchase\n    }\n  }\n": types.NewPurchaseDocument,
    "\n  mutation UpdatePurchase($id: Int!, $purchase: Purchase!) {\n    updatePurchase(id: $id, purchase: $purchase) {\n      ...IdPurchase\n    }\n  }\n": types.UpdatePurchaseDocument,
    "\n  mutation NewResearch($research: Research!) {\n    newResearch(research: $research) {\n      ...IdResearch\n    }\n  }\n": types.NewResearchDocument,
    "\n  mutation UpdateResearch($id: Int!, $research: Research!) {\n    updateResearch(id: $id, research: $research) {\n      ...IdResearch\n    }\n  }\n": types.UpdateResearchDocument,
    "\n  query Researches {\n    researches {\n      ...IdResearch\n    }\n  }\n": types.ResearchesDocument,
    "\n  query ResearchById($id: Int!) {\n    research(id: $id) {\n      ...IdResearch\n    }\n  }\n": types.ResearchByIdDocument,
    "\n  query Purchases {\n    purchases {\n      ...IdPurchase\n    }\n  }\n": types.PurchasesDocument,
    "\n  query PurchaseByUserId($UserId: Int!) {\n    userPurchases(userId: $UserId) {\n      ...IdPurchase\n  }\n}\n": types.PurchaseByUserIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment IdVaccine on IdVaccine {\n    id\n    description\n    dose\n    name\n    pricePerUnit\n    amountInStock\n    research {\n      id\n      name\n      progress\n      laboratory {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment IdVaccine on IdVaccine {\n    id\n    description\n    dose\n    name\n    pricePerUnit\n    amountInStock\n    research {\n      id\n      name\n      progress\n      laboratory {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment IdPurchase on IdPurchase {\n    id\n    user {\n      id\n      name\n    }\n    vaccine {\n      id\n      name\n      description\n    }\n    amount\n    timestamp\n    totalSpent\n    status\n  }\n"): (typeof documents)["\n  fragment IdPurchase on IdPurchase {\n    id\n    user {\n      id\n      name\n    }\n    vaccine {\n      id\n      name\n      description\n    }\n    amount\n    timestamp\n    totalSpent\n    status\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment IdResearch on IdResearch {\n    id\n    status\n    progress\n    name\n    description\n    report\n    startDate\n    laboratory {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment IdResearch on IdResearch {\n    id\n    status\n    progress\n    name\n    description\n    report\n    startDate\n    laboratory {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchVaccine($vaccineQuery: VaccineQuery!) {\n    searchVaccine(vaccineQuery: $vaccineQuery) {\n      count\n      vaccines {\n        ...IdVaccine\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchVaccine($vaccineQuery: VaccineQuery!) {\n    searchVaccine(vaccineQuery: $vaccineQuery) {\n      count\n      vaccines {\n        ...IdVaccine\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query VaccineById($id: Int!) {\n    vaccine(id: $id) {\n      ...IdVaccine\n    }\n  }\n"): (typeof documents)["\n  query VaccineById($id: Int!) {\n    vaccine(id: $id) {\n      ...IdVaccine\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateVaccineStock($id: Int!, $decrement: Int!) {\n    updateVaccineStock(id: $id, decrement: $decrement) {\n      ...IdVaccine\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateVaccineStock($id: Int!, $decrement: Int!) {\n    updateVaccineStock(id: $id, decrement: $decrement) {\n      ...IdVaccine\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateVaccine($id: Int!, $vaccine: Vaccine!) {\n    updateVaccine(id: $id, vaccine: $vaccine) {\n      ...IdVaccine\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateVaccine($id: Int!, $vaccine: Vaccine!) {\n    updateVaccine(id: $id, vaccine: $vaccine) {\n      ...IdVaccine\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation NewVaccine($vaccine: Vaccine!) {\n    newVaccine(vaccine: $vaccine) {\n      ...IdVaccine\n    }\n  }\n"): (typeof documents)["\n  mutation NewVaccine($vaccine: Vaccine!) {\n    newVaccine(vaccine: $vaccine) {\n      ...IdVaccine\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteVaccine($id: Int!) {\n    deleteVaccine(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteVaccine($id: Int!) {\n    deleteVaccine(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation NewPurchase($purchase: Purchase!) {\n    newPurchase(purchase: $purchase) {\n      ...IdPurchase\n    }\n  }\n"): (typeof documents)["\n  mutation NewPurchase($purchase: Purchase!) {\n    newPurchase(purchase: $purchase) {\n      ...IdPurchase\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdatePurchase($id: Int!, $purchase: Purchase!) {\n    updatePurchase(id: $id, purchase: $purchase) {\n      ...IdPurchase\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePurchase($id: Int!, $purchase: Purchase!) {\n    updatePurchase(id: $id, purchase: $purchase) {\n      ...IdPurchase\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation NewResearch($research: Research!) {\n    newResearch(research: $research) {\n      ...IdResearch\n    }\n  }\n"): (typeof documents)["\n  mutation NewResearch($research: Research!) {\n    newResearch(research: $research) {\n      ...IdResearch\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateResearch($id: Int!, $research: Research!) {\n    updateResearch(id: $id, research: $research) {\n      ...IdResearch\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateResearch($id: Int!, $research: Research!) {\n    updateResearch(id: $id, research: $research) {\n      ...IdResearch\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Researches {\n    researches {\n      ...IdResearch\n    }\n  }\n"): (typeof documents)["\n  query Researches {\n    researches {\n      ...IdResearch\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ResearchById($id: Int!) {\n    research(id: $id) {\n      ...IdResearch\n    }\n  }\n"): (typeof documents)["\n  query ResearchById($id: Int!) {\n    research(id: $id) {\n      ...IdResearch\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Purchases {\n    purchases {\n      ...IdPurchase\n    }\n  }\n"): (typeof documents)["\n  query Purchases {\n    purchases {\n      ...IdPurchase\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PurchaseByUserId($UserId: Int!) {\n    userPurchases(userId: $UserId) {\n      ...IdPurchase\n  }\n}\n"): (typeof documents)["\n  query PurchaseByUserId($UserId: Int!) {\n    userPurchases(userId: $UserId) {\n      ...IdPurchase\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;