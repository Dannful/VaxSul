/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  LocalDate: { input: any; output: any; }
  LocalDateTime: { input: any; output: any; }
  /** The Long scalar type represents a signed 64-bit numeric non-fractional value */
  Long: { input: any; output: any; }
  /** The Short scalar type represents a signed 16-bit numeric non-fractional value */
  Short: { input: any; output: any; }
};

export type IdLaboratory = {
  __typename?: 'IdLaboratory';
  cnpj: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type IdPurchase = {
  __typename?: 'IdPurchase';
  amount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  status: PurchaseStatus;
  timestamp?: Maybe<Scalars['LocalDateTime']['output']>;
  totalSpent: Scalars['Float']['output'];
  user: IdUser;
  vaccine: IdVaccine;
};

export type IdResearch = {
  __typename?: 'IdResearch';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  laboratory: IdLaboratory;
  name: Scalars['String']['output'];
  progress: Scalars['Float']['output'];
  report: Scalars['String']['output'];
  startDate: Scalars['LocalDateTime']['output'];
  status: ResearchStatus;
};

export type IdUser = {
  __typename?: 'IdUser';
  birthday: Scalars['LocalDate']['output'];
  cpf: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  laboratoryId?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Role;
};

export type IdVaccine = {
  __typename?: 'IdVaccine';
  amountInStock: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  dose: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pricePerUnit: Scalars['Float']['output'];
  research: IdResearch;
};

export type Laboratory = {
  cnpj: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

/** Mutation object */
export type Mutation = {
  __typename?: 'Mutation';
  deleteVaccine?: Maybe<IdVaccine>;
  newLaboratory: IdLaboratory;
  newPurchase: IdPurchase;
  newResearch: IdResearch;
  newUser: IdUser;
  newVaccine: IdVaccine;
  updateLaboratory?: Maybe<IdLaboratory>;
  updatePurchase?: Maybe<IdPurchase>;
  updateResearch?: Maybe<IdResearch>;
  updateUser?: Maybe<IdUser>;
  updateVaccine?: Maybe<IdVaccine>;
  updateVaccineStock?: Maybe<IdVaccine>;
};


/** Mutation object */
export type MutationDeleteVaccineArgs = {
  id: Scalars['Int']['input'];
};


/** Mutation object */
export type MutationNewLaboratoryArgs = {
  laboratory: Laboratory;
};


/** Mutation object */
export type MutationNewPurchaseArgs = {
  purchase: Purchase;
};


/** Mutation object */
export type MutationNewResearchArgs = {
  research: Research;
};


/** Mutation object */
export type MutationNewUserArgs = {
  user: User;
};


/** Mutation object */
export type MutationNewVaccineArgs = {
  vaccine: Vaccine;
};


/** Mutation object */
export type MutationUpdateLaboratoryArgs = {
  id: Scalars['Int']['input'];
  laboratory: Laboratory;
};


/** Mutation object */
export type MutationUpdatePurchaseArgs = {
  id: Scalars['Int']['input'];
  purchase: Purchase;
};


/** Mutation object */
export type MutationUpdateResearchArgs = {
  id: Scalars['Int']['input'];
  research: Research;
};


/** Mutation object */
export type MutationUpdateUserArgs = {
  id: Scalars['Int']['input'];
  user: User;
};


/** Mutation object */
export type MutationUpdateVaccineArgs = {
  id: Scalars['Int']['input'];
  vaccine: Vaccine;
};


/** Mutation object */
export type MutationUpdateVaccineStockArgs = {
  decrement: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};

export type Purchase = {
  amount: Scalars['Int']['input'];
  status: PurchaseStatus;
  timestamp?: InputMaybe<Scalars['LocalDateTime']['input']>;
  totalSpent: Scalars['Float']['input'];
  userId: Scalars['Int']['input'];
  vaccineId: Scalars['Int']['input'];
};

/** Purchase status */
export enum PurchaseStatus {
  Approved = 'APPROVED',
  InValidation = 'IN_VALIDATION',
  Rejected = 'REJECTED',
  WaitPayment = 'WAIT_PAYMENT'
}

/** Query object */
export type Query = {
  __typename?: 'Query';
  laboratories: Array<IdLaboratory>;
  laboratory?: Maybe<IdLaboratory>;
  purchase?: Maybe<IdPurchase>;
  purchases: Array<IdPurchase>;
  research?: Maybe<IdResearch>;
  researches: Array<IdResearch>;
  searchVaccine: VaccineSearchResult;
  userPurchases: Array<IdPurchase>;
  vaccine?: Maybe<IdVaccine>;
  vaccines: Array<IdVaccine>;
};


/** Query object */
export type QueryLaboratoryArgs = {
  id: Scalars['Int']['input'];
};


/** Query object */
export type QueryPurchaseArgs = {
  id: Scalars['Int']['input'];
};


/** Query object */
export type QueryResearchArgs = {
  id: Scalars['Int']['input'];
};


/** Query object */
export type QuerySearchVaccineArgs = {
  vaccineQuery: VaccineQuery;
};


/** Query object */
export type QueryUserPurchasesArgs = {
  userId: Scalars['Int']['input'];
};


/** Query object */
export type QueryVaccineArgs = {
  id: Scalars['Int']['input'];
};

export type Research = {
  description: Scalars['String']['input'];
  laboratoryId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  progress: Scalars['Float']['input'];
  report: Scalars['String']['input'];
  startDate: Scalars['LocalDateTime']['input'];
  status: ResearchStatus;
};

/** Research status */
export enum ResearchStatus {
  Approved = 'APPROVED',
  Completed = 'COMPLETED',
  Dropped = 'DROPPED',
  InProgress = 'IN_PROGRESS',
  Paused = 'PAUSED',
  Rejected = 'REJECTED'
}

/** User's role */
export enum Role {
  Admin = 'ADMIN',
  Researcher = 'RESEARCHER',
  ResearchLead = 'RESEARCH_LEAD',
  SalesManager = 'SALES_MANAGER',
  User = 'USER'
}

export type User = {
  birthday: Scalars['LocalDate']['input'];
  cpf: Scalars['String']['input'];
  email: Scalars['String']['input'];
  laboratoryId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: Role;
};

export type Vaccine = {
  amountInStock: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  dose: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  pricePerUnit: Scalars['Float']['input'];
  researchId: Scalars['Int']['input'];
};

export type VaccineQuery = {
  amountInStock?: InputMaybe<Scalars['Int']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  maximumPrice?: InputMaybe<Scalars['Float']['input']>;
  minimumPrice?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sellable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VaccineSearchResult = {
  __typename?: 'VaccineSearchResult';
  count: Scalars['Long']['output'];
  vaccines: Array<IdVaccine>;
};

export type IdVaccineFragment = { __typename?: 'IdVaccine', id: number, description: string, dose: number, name: string, pricePerUnit: number, amountInStock: number, research: { __typename?: 'IdResearch', id: number, name: string, progress: number, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } } };

export type IdPurchaseFragment = { __typename?: 'IdPurchase', id: number, amount: number, timestamp?: any | null, totalSpent: number, status: PurchaseStatus, user: { __typename?: 'IdUser', id: number, name: string }, vaccine: { __typename?: 'IdVaccine', id: number, name: string, description: string } };

export type IdResearchFragment = { __typename?: 'IdResearch', id: number, status: ResearchStatus, progress: number, name: string, description: string, report: string, startDate: any, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } };

export type SearchVaccineQueryVariables = Exact<{
  vaccineQuery: VaccineQuery;
}>;


export type SearchVaccineQuery = { __typename?: 'Query', searchVaccine: { __typename?: 'VaccineSearchResult', count: any, vaccines: Array<{ __typename?: 'IdVaccine', id: number, description: string, dose: number, name: string, pricePerUnit: number, amountInStock: number, research: { __typename?: 'IdResearch', id: number, name: string, progress: number, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } } }> } };

export type VaccineByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type VaccineByIdQuery = { __typename?: 'Query', vaccine?: { __typename?: 'IdVaccine', id: number, description: string, dose: number, name: string, pricePerUnit: number, amountInStock: number, research: { __typename?: 'IdResearch', id: number, name: string, progress: number, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } } } | null };

export type UpdateVaccineStockMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  decrement: Scalars['Int']['input'];
}>;


export type UpdateVaccineStockMutation = { __typename?: 'Mutation', updateVaccineStock?: { __typename?: 'IdVaccine', id: number, description: string, dose: number, name: string, pricePerUnit: number, amountInStock: number, research: { __typename?: 'IdResearch', id: number, name: string, progress: number, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } } } | null };

export type UpdateVaccineMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  vaccine: Vaccine;
}>;


export type UpdateVaccineMutation = { __typename?: 'Mutation', updateVaccine?: { __typename?: 'IdVaccine', id: number, description: string, dose: number, name: string, pricePerUnit: number, amountInStock: number, research: { __typename?: 'IdResearch', id: number, name: string, progress: number, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } } } | null };

export type NewVaccineMutationVariables = Exact<{
  vaccine: Vaccine;
}>;


export type NewVaccineMutation = { __typename?: 'Mutation', newVaccine: { __typename?: 'IdVaccine', id: number, description: string, dose: number, name: string, pricePerUnit: number, amountInStock: number, research: { __typename?: 'IdResearch', id: number, name: string, progress: number, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } } } };

export type DeleteVaccineMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteVaccineMutation = { __typename?: 'Mutation', deleteVaccine?: { __typename?: 'IdVaccine', id: number } | null };

export type NewPurchaseMutationVariables = Exact<{
  purchase: Purchase;
}>;


export type NewPurchaseMutation = { __typename?: 'Mutation', newPurchase: { __typename?: 'IdPurchase', id: number, amount: number, timestamp?: any | null, totalSpent: number, status: PurchaseStatus, user: { __typename?: 'IdUser', id: number, name: string }, vaccine: { __typename?: 'IdVaccine', id: number, name: string, description: string } } };

export type UpdatePurchaseMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  purchase: Purchase;
}>;


export type UpdatePurchaseMutation = { __typename?: 'Mutation', updatePurchase?: { __typename?: 'IdPurchase', id: number, amount: number, timestamp?: any | null, totalSpent: number, status: PurchaseStatus, user: { __typename?: 'IdUser', id: number, name: string }, vaccine: { __typename?: 'IdVaccine', id: number, name: string, description: string } } | null };

export type NewResearchMutationVariables = Exact<{
  research: Research;
}>;


export type NewResearchMutation = { __typename?: 'Mutation', newResearch: { __typename?: 'IdResearch', id: number, status: ResearchStatus, progress: number, name: string, description: string, report: string, startDate: any, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } } };

export type UpdateResearchMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  research: Research;
}>;


export type UpdateResearchMutation = { __typename?: 'Mutation', updateResearch?: { __typename?: 'IdResearch', id: number, status: ResearchStatus, progress: number, name: string, description: string, report: string, startDate: any, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } } | null };

export type ResearchesQueryVariables = Exact<{ [key: string]: never; }>;


export type ResearchesQuery = { __typename?: 'Query', researches: Array<{ __typename?: 'IdResearch', id: number, status: ResearchStatus, progress: number, name: string, description: string, report: string, startDate: any, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } }> };

export type ResearchByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ResearchByIdQuery = { __typename?: 'Query', research?: { __typename?: 'IdResearch', id: number, status: ResearchStatus, progress: number, name: string, description: string, report: string, startDate: any, laboratory: { __typename?: 'IdLaboratory', id: number, name: string } } | null };

export type PurchasesQueryVariables = Exact<{ [key: string]: never; }>;


export type PurchasesQuery = { __typename?: 'Query', purchases: Array<{ __typename?: 'IdPurchase', id: number, amount: number, timestamp?: any | null, totalSpent: number, status: PurchaseStatus, user: { __typename?: 'IdUser', id: number, name: string }, vaccine: { __typename?: 'IdVaccine', id: number, name: string, description: string } }> };

export type PurchaseByUserIdQueryVariables = Exact<{
  UserId: Scalars['Int']['input'];
}>;


export type PurchaseByUserIdQuery = { __typename?: 'Query', userPurchases: Array<{ __typename?: 'IdPurchase', id: number, amount: number, timestamp?: any | null, totalSpent: number, status: PurchaseStatus, user: { __typename?: 'IdUser', id: number, name: string }, vaccine: { __typename?: 'IdVaccine', id: number, name: string, description: string } }> };

export const IdVaccineFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdVaccine"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdVaccine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dose"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountInStock"}},{"kind":"Field","name":{"kind":"Name","value":"research"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<IdVaccineFragment, unknown>;
export const IdPurchaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdPurchase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdPurchase"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vaccine"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalSpent"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<IdPurchaseFragment, unknown>;
export const IdResearchFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdResearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"report"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<IdResearchFragment, unknown>;
export const SearchVaccineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchVaccine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vaccineQuery"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VaccineQuery"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchVaccine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vaccineQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaccineQuery"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"vaccines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdVaccine"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdVaccine"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdVaccine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dose"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountInStock"}},{"kind":"Field","name":{"kind":"Name","value":"research"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SearchVaccineQuery, SearchVaccineQueryVariables>;
export const VaccineByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VaccineById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vaccine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdVaccine"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdVaccine"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdVaccine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dose"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountInStock"}},{"kind":"Field","name":{"kind":"Name","value":"research"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<VaccineByIdQuery, VaccineByIdQueryVariables>;
export const UpdateVaccineStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVaccineStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"decrement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVaccineStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"decrement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"decrement"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdVaccine"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdVaccine"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdVaccine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dose"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountInStock"}},{"kind":"Field","name":{"kind":"Name","value":"research"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateVaccineStockMutation, UpdateVaccineStockMutationVariables>;
export const UpdateVaccineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVaccine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vaccine"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Vaccine"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVaccine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"vaccine"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaccine"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdVaccine"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdVaccine"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdVaccine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dose"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountInStock"}},{"kind":"Field","name":{"kind":"Name","value":"research"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateVaccineMutation, UpdateVaccineMutationVariables>;
export const NewVaccineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NewVaccine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vaccine"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Vaccine"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newVaccine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vaccine"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaccine"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdVaccine"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdVaccine"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdVaccine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dose"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountInStock"}},{"kind":"Field","name":{"kind":"Name","value":"research"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<NewVaccineMutation, NewVaccineMutationVariables>;
export const DeleteVaccineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVaccine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteVaccine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteVaccineMutation, DeleteVaccineMutationVariables>;
export const NewPurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NewPurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"purchase"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Purchase"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newPurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"purchase"},"value":{"kind":"Variable","name":{"kind":"Name","value":"purchase"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdPurchase"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdPurchase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdPurchase"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vaccine"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalSpent"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<NewPurchaseMutation, NewPurchaseMutationVariables>;
export const UpdatePurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"purchase"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Purchase"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"purchase"},"value":{"kind":"Variable","name":{"kind":"Name","value":"purchase"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdPurchase"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdPurchase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdPurchase"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vaccine"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalSpent"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<UpdatePurchaseMutation, UpdatePurchaseMutationVariables>;
export const NewResearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NewResearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"research"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Research"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newResearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"research"},"value":{"kind":"Variable","name":{"kind":"Name","value":"research"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdResearch"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdResearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"report"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<NewResearchMutation, NewResearchMutationVariables>;
export const UpdateResearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateResearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"research"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Research"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateResearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"research"},"value":{"kind":"Variable","name":{"kind":"Name","value":"research"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdResearch"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdResearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"report"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateResearchMutation, UpdateResearchMutationVariables>;
export const ResearchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Researches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"researches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdResearch"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdResearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"report"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ResearchesQuery, ResearchesQueryVariables>;
export const ResearchByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResearchById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"research"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdResearch"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdResearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"report"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"laboratory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ResearchByIdQuery, ResearchByIdQueryVariables>;
export const PurchasesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Purchases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"purchases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdPurchase"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdPurchase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdPurchase"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vaccine"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalSpent"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<PurchasesQuery, PurchasesQueryVariables>;
export const PurchaseByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PurchaseByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"UserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPurchases"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"UserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IdPurchase"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IdPurchase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdPurchase"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vaccine"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalSpent"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<PurchaseByUserIdQuery, PurchaseByUserIdQueryVariables>;