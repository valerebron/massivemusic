// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateStyle {
  count: Int!
}

type AggregateTrack {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createStyle(data: StyleCreateInput!): Style!
  updateStyle(data: StyleUpdateInput!, where: StyleWhereUniqueInput!): Style
  updateManyStyles(data: StyleUpdateManyMutationInput!, where: StyleWhereInput): BatchPayload!
  upsertStyle(where: StyleWhereUniqueInput!, create: StyleCreateInput!, update: StyleUpdateInput!): Style!
  deleteStyle(where: StyleWhereUniqueInput!): Style
  deleteManyStyles(where: StyleWhereInput): BatchPayload!
  createTrack(data: TrackCreateInput!): Track!
  updateTrack(data: TrackUpdateInput!, where: TrackWhereUniqueInput!): Track
  updateManyTracks(data: TrackUpdateManyMutationInput!, where: TrackWhereInput): BatchPayload!
  upsertTrack(where: TrackWhereUniqueInput!, create: TrackCreateInput!, update: TrackUpdateInput!): Track!
  deleteTrack(where: TrackWhereUniqueInput!): Track
  deleteManyTracks(where: TrackWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  style(where: StyleWhereUniqueInput!): Style
  styles(where: StyleWhereInput, orderBy: StyleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Style]!
  stylesConnection(where: StyleWhereInput, orderBy: StyleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StyleConnection!
  track(where: TrackWhereUniqueInput!): Track
  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track]!
  tracksConnection(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrackConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Style {
  id: ID!
  name: String!
  slug: String!
}

type StyleConnection {
  pageInfo: PageInfo!
  edges: [StyleEdge]!
  aggregate: AggregateStyle!
}

input StyleCreateInput {
  id: ID
  name: String!
  slug: String!
}

input StyleCreateOneInput {
  create: StyleCreateInput
  connect: StyleWhereUniqueInput
}

type StyleEdge {
  node: Style!
  cursor: String!
}

enum StyleOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  slug_ASC
  slug_DESC
}

type StylePreviousValues {
  id: ID!
  name: String!
  slug: String!
}

type StyleSubscriptionPayload {
  mutation: MutationType!
  node: Style
  updatedFields: [String!]
  previousValues: StylePreviousValues
}

input StyleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: StyleWhereInput
  AND: [StyleSubscriptionWhereInput!]
  OR: [StyleSubscriptionWhereInput!]
  NOT: [StyleSubscriptionWhereInput!]
}

input StyleUpdateDataInput {
  name: String
  slug: String
}

input StyleUpdateInput {
  name: String
  slug: String
}

input StyleUpdateManyMutationInput {
  name: String
  slug: String
}

input StyleUpdateOneRequiredInput {
  create: StyleCreateInput
  update: StyleUpdateDataInput
  upsert: StyleUpsertNestedInput
  connect: StyleWhereUniqueInput
}

input StyleUpsertNestedInput {
  update: StyleUpdateDataInput!
  create: StyleCreateInput!
}

input StyleWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  slug: String
  slug_not: String
  slug_in: [String!]
  slug_not_in: [String!]
  slug_lt: String
  slug_lte: String
  slug_gt: String
  slug_gte: String
  slug_contains: String
  slug_not_contains: String
  slug_starts_with: String
  slug_not_starts_with: String
  slug_ends_with: String
  slug_not_ends_with: String
  AND: [StyleWhereInput!]
  OR: [StyleWhereInput!]
  NOT: [StyleWhereInput!]
}

input StyleWhereUniqueInput {
  id: ID
}

type Subscription {
  style(where: StyleSubscriptionWhereInput): StyleSubscriptionPayload
  track(where: TrackSubscriptionWhereInput): TrackSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Track {
  id: ID!
  title: String!
  artist: String!
  duration: Int!
  playcount: Int!
  invalid: Boolean
  style: Style!
  user: User!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type TrackConnection {
  pageInfo: PageInfo!
  edges: [TrackEdge]!
  aggregate: AggregateTrack!
}

input TrackCreateInput {
  id: ID
  title: String!
  artist: String!
  duration: Int!
  playcount: Int
  invalid: Boolean
  style: StyleCreateOneInput!
  user: UserCreateOneWithoutTracksInput!
}

input TrackCreateManyWithoutUserInput {
  create: [TrackCreateWithoutUserInput!]
  connect: [TrackWhereUniqueInput!]
}

input TrackCreateWithoutUserInput {
  id: ID
  title: String!
  artist: String!
  duration: Int!
  playcount: Int
  invalid: Boolean
  style: StyleCreateOneInput!
}

type TrackEdge {
  node: Track!
  cursor: String!
}

enum TrackOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  artist_ASC
  artist_DESC
  duration_ASC
  duration_DESC
  playcount_ASC
  playcount_DESC
  invalid_ASC
  invalid_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TrackPreviousValues {
  id: ID!
  title: String!
  artist: String!
  duration: Int!
  playcount: Int!
  invalid: Boolean
  createdAt: DateTime!
  updatedAt: DateTime!
}

input TrackScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  artist: String
  artist_not: String
  artist_in: [String!]
  artist_not_in: [String!]
  artist_lt: String
  artist_lte: String
  artist_gt: String
  artist_gte: String
  artist_contains: String
  artist_not_contains: String
  artist_starts_with: String
  artist_not_starts_with: String
  artist_ends_with: String
  artist_not_ends_with: String
  duration: Int
  duration_not: Int
  duration_in: [Int!]
  duration_not_in: [Int!]
  duration_lt: Int
  duration_lte: Int
  duration_gt: Int
  duration_gte: Int
  playcount: Int
  playcount_not: Int
  playcount_in: [Int!]
  playcount_not_in: [Int!]
  playcount_lt: Int
  playcount_lte: Int
  playcount_gt: Int
  playcount_gte: Int
  invalid: Boolean
  invalid_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [TrackScalarWhereInput!]
  OR: [TrackScalarWhereInput!]
  NOT: [TrackScalarWhereInput!]
}

type TrackSubscriptionPayload {
  mutation: MutationType!
  node: Track
  updatedFields: [String!]
  previousValues: TrackPreviousValues
}

input TrackSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TrackWhereInput
  AND: [TrackSubscriptionWhereInput!]
  OR: [TrackSubscriptionWhereInput!]
  NOT: [TrackSubscriptionWhereInput!]
}

input TrackUpdateInput {
  title: String
  artist: String
  duration: Int
  playcount: Int
  invalid: Boolean
  style: StyleUpdateOneRequiredInput
  user: UserUpdateOneRequiredWithoutTracksInput
}

input TrackUpdateManyDataInput {
  title: String
  artist: String
  duration: Int
  playcount: Int
  invalid: Boolean
}

input TrackUpdateManyMutationInput {
  title: String
  artist: String
  duration: Int
  playcount: Int
  invalid: Boolean
}

input TrackUpdateManyWithoutUserInput {
  create: [TrackCreateWithoutUserInput!]
  delete: [TrackWhereUniqueInput!]
  connect: [TrackWhereUniqueInput!]
  set: [TrackWhereUniqueInput!]
  disconnect: [TrackWhereUniqueInput!]
  update: [TrackUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [TrackUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [TrackScalarWhereInput!]
  updateMany: [TrackUpdateManyWithWhereNestedInput!]
}

input TrackUpdateManyWithWhereNestedInput {
  where: TrackScalarWhereInput!
  data: TrackUpdateManyDataInput!
}

input TrackUpdateWithoutUserDataInput {
  title: String
  artist: String
  duration: Int
  playcount: Int
  invalid: Boolean
  style: StyleUpdateOneRequiredInput
}

input TrackUpdateWithWhereUniqueWithoutUserInput {
  where: TrackWhereUniqueInput!
  data: TrackUpdateWithoutUserDataInput!
}

input TrackUpsertWithWhereUniqueWithoutUserInput {
  where: TrackWhereUniqueInput!
  update: TrackUpdateWithoutUserDataInput!
  create: TrackCreateWithoutUserInput!
}

input TrackWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  artist: String
  artist_not: String
  artist_in: [String!]
  artist_not_in: [String!]
  artist_lt: String
  artist_lte: String
  artist_gt: String
  artist_gte: String
  artist_contains: String
  artist_not_contains: String
  artist_starts_with: String
  artist_not_starts_with: String
  artist_ends_with: String
  artist_not_ends_with: String
  duration: Int
  duration_not: Int
  duration_in: [Int!]
  duration_not_in: [Int!]
  duration_lt: Int
  duration_lte: Int
  duration_gt: Int
  duration_gte: Int
  playcount: Int
  playcount_not: Int
  playcount_in: [Int!]
  playcount_not_in: [Int!]
  playcount_lt: Int
  playcount_lte: Int
  playcount_gt: Int
  playcount_gte: Int
  invalid: Boolean
  invalid_not: Boolean
  style: StyleWhereInput
  user: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [TrackWhereInput!]
  OR: [TrackWhereInput!]
  NOT: [TrackWhereInput!]
}

input TrackWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  role: userRole!
  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track!]
  createdAt: DateTime!
  updatedAt: DateTime!
  token: String
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  name: String!
  email: String!
  password: String!
  role: userRole!
  tracks: TrackCreateManyWithoutUserInput
  token: String
}

input UserCreateOneWithoutTracksInput {
  create: UserCreateWithoutTracksInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTracksInput {
  id: ID
  name: String!
  email: String!
  password: String!
  role: userRole!
  token: String
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  token_ASC
  token_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
  role: userRole!
  createdAt: DateTime!
  updatedAt: DateTime!
  token: String
}

enum userRole {
  USER
  ADMIN
  ROBOT
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  role: userRole
  tracks: TrackUpdateManyWithoutUserInput
  token: String
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
  role: userRole
  token: String
}

input UserUpdateOneRequiredWithoutTracksInput {
  create: UserCreateWithoutTracksInput
  update: UserUpdateWithoutTracksDataInput
  upsert: UserUpsertWithoutTracksInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutTracksDataInput {
  name: String
  email: String
  password: String
  role: userRole
  token: String
}

input UserUpsertWithoutTracksInput {
  update: UserUpdateWithoutTracksDataInput!
  create: UserCreateWithoutTracksInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  role: userRole
  role_not: userRole
  role_in: [userRole!]
  role_not_in: [userRole!]
  tracks_every: TrackWhereInput
  tracks_some: TrackWhereInput
  tracks_none: TrackWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`