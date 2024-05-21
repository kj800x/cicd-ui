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
  /** A scalar that can represent any JSON Object value. */
  JSONObject: { input: any; output: any; }
};

export type DockerContainer = {
  __typename?: 'DockerContainer';
  created: Scalars['Int']['output'];
  currentBuild?: Maybe<TrackedBuild>;
  id: Scalars['String']['output'];
  image: DockerImage;
  imageDescriptor: Scalars['String']['output'];
  isFirstParty: Scalars['Boolean']['output'];
  isRepoTracked: Scalars['Boolean']['output'];
  labels?: Maybe<Scalars['JSONObject']['output']>;
  latestBuild?: Maybe<TrackedBuild>;
  name: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type DockerImage = {
  __typename?: 'DockerImage';
  id: Scalars['String']['output'];
  labels?: Maybe<Scalars['JSONObject']['output']>;
};

export type Machine = {
  __typename?: 'Machine';
  containers: Array<DockerContainer>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  machines: Array<Machine>;
  recentBuilds: Array<TrackedBuildAndRepo>;
};

export type TrackedBuild = {
  __typename?: 'TrackedBuild';
  buildStatus?: Maybe<Scalars['String']['output']>;
  buildUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  sha: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

export type TrackedBuildAndRepo = {
  __typename?: 'TrackedBuildAndRepo';
  buildStatus?: Maybe<Scalars['String']['output']>;
  buildUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  repoName: Scalars['String']['output'];
  repoOwnerName: Scalars['String']['output'];
  sha: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

export type OmnibusQueryVariables = Exact<{ [key: string]: never; }>;


export type OmnibusQuery = { __typename?: 'QueryRoot', machines: Array<{ __typename?: 'Machine', url: string, id: number, name: string, containers: Array<{ __typename?: 'DockerContainer', id: string, imageDescriptor: string, name: string, state: string, isFirstParty: boolean, isRepoTracked: boolean, image: { __typename?: 'DockerImage', id: string, labels?: any | null }, latestBuild?: { __typename?: 'TrackedBuild', id: number, buildStatus?: string | null, buildUrl?: string | null, sha: string, message: string, timestamp: number } | null, currentBuild?: { __typename?: 'TrackedBuild', id: number, buildStatus?: string | null, sha: string, message: string, timestamp: number, buildUrl?: string | null } | null }> }>, recentBuilds: Array<{ __typename?: 'TrackedBuildAndRepo', id: number, buildStatus?: string | null, sha: string, message: string, timestamp: number, buildUrl?: string | null, repoName: string, repoOwnerName: string }> };


export const OmnibusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"omnibus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"machines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"containers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageDescriptor"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"isFirstParty"}},{"kind":"Field","name":{"kind":"Name","value":"isRepoTracked"}},{"kind":"Field","name":{"kind":"Name","value":"latestBuild"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildStatus"}},{"kind":"Field","name":{"kind":"Name","value":"buildUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentBuild"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildStatus"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"buildUrl"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recentBuilds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildStatus"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"buildUrl"}},{"kind":"Field","name":{"kind":"Name","value":"repoName"}},{"kind":"Field","name":{"kind":"Name","value":"repoOwnerName"}}]}}]}}]} as unknown as DocumentNode<OmnibusQuery, OmnibusQueryVariables>;