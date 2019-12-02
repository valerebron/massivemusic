// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  style: (where?: StyleWhereInput) => Promise<boolean>;
  track: (where?: TrackWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  style: (where: StyleWhereUniqueInput) => StyleNullablePromise;
  styles: (args?: {
    where?: StyleWhereInput;
    orderBy?: StyleOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Style>;
  stylesConnection: (args?: {
    where?: StyleWhereInput;
    orderBy?: StyleOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => StyleConnectionPromise;
  track: (where: TrackWhereUniqueInput) => TrackNullablePromise;
  tracks: (args?: {
    where?: TrackWhereInput;
    orderBy?: TrackOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Track>;
  tracksConnection: (args?: {
    where?: TrackWhereInput;
    orderBy?: TrackOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => TrackConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createStyle: (data: StyleCreateInput) => StylePromise;
  updateStyle: (args: {
    data: StyleUpdateInput;
    where: StyleWhereUniqueInput;
  }) => StylePromise;
  updateManyStyles: (args: {
    data: StyleUpdateManyMutationInput;
    where?: StyleWhereInput;
  }) => BatchPayloadPromise;
  upsertStyle: (args: {
    where: StyleWhereUniqueInput;
    create: StyleCreateInput;
    update: StyleUpdateInput;
  }) => StylePromise;
  deleteStyle: (where: StyleWhereUniqueInput) => StylePromise;
  deleteManyStyles: (where?: StyleWhereInput) => BatchPayloadPromise;
  createTrack: (data: TrackCreateInput) => TrackPromise;
  updateTrack: (args: {
    data: TrackUpdateInput;
    where: TrackWhereUniqueInput;
  }) => TrackPromise;
  updateManyTracks: (args: {
    data: TrackUpdateManyMutationInput;
    where?: TrackWhereInput;
  }) => BatchPayloadPromise;
  upsertTrack: (args: {
    where: TrackWhereUniqueInput;
    create: TrackCreateInput;
    update: TrackUpdateInput;
  }) => TrackPromise;
  deleteTrack: (where: TrackWhereUniqueInput) => TrackPromise;
  deleteManyTracks: (where?: TrackWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  style: (
    where?: StyleSubscriptionWhereInput
  ) => StyleSubscriptionPayloadSubscription;
  track: (
    where?: TrackSubscriptionWhereInput
  ) => TrackSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type userRole = "USER" | "ADMIN" | "ROBOT";

export type StyleOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "slug_ASC"
  | "slug_DESC";

export type TrackOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "title_ASC"
  | "title_DESC"
  | "artist_ASC"
  | "artist_DESC"
  | "duration_ASC"
  | "duration_DESC"
  | "playcount_ASC"
  | "playcount_DESC"
  | "invalid_ASC"
  | "invalid_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "email_ASC"
  | "email_DESC"
  | "password_ASC"
  | "password_DESC"
  | "role_ASC"
  | "role_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface TrackCreateInput {
  id?: Maybe<ID_Input>;
  title: String;
  artist: String;
  duration: Int;
  playcount?: Maybe<Int>;
  invalid?: Maybe<Boolean>;
  style: StyleCreateOneInput;
  user: UserCreateOneWithoutTracksInput;
}

export type StyleWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface UserUpdateInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<userRole>;
  tracks?: Maybe<TrackUpdateManyWithoutUserInput>;
}

export interface UserUpdateOneRequiredWithoutTracksInput {
  create?: Maybe<UserCreateWithoutTracksInput>;
  update?: Maybe<UserUpdateWithoutTracksDataInput>;
  upsert?: Maybe<UserUpsertWithoutTracksInput>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface TrackCreateWithoutUserInput {
  id?: Maybe<ID_Input>;
  title: String;
  artist: String;
  duration: Int;
  playcount?: Maybe<Int>;
  invalid?: Maybe<Boolean>;
  style: StyleCreateOneInput;
}

export interface UserCreateWithoutTracksInput {
  id?: Maybe<ID_Input>;
  name: String;
  email: String;
  password: String;
  role: userRole;
}

export interface TrackCreateManyWithoutUserInput {
  create?: Maybe<TrackCreateWithoutUserInput[] | TrackCreateWithoutUserInput>;
  connect?: Maybe<TrackWhereUniqueInput[] | TrackWhereUniqueInput>;
}

export interface TrackSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<TrackWhereInput>;
  AND?: Maybe<TrackSubscriptionWhereInput[] | TrackSubscriptionWhereInput>;
  OR?: Maybe<TrackSubscriptionWhereInput[] | TrackSubscriptionWhereInput>;
  NOT?: Maybe<TrackSubscriptionWhereInput[] | TrackSubscriptionWhereInput>;
}

export type TrackWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface TrackUpdateManyDataInput {
  title?: Maybe<String>;
  artist?: Maybe<String>;
  duration?: Maybe<Int>;
  playcount?: Maybe<Int>;
  invalid?: Maybe<Boolean>;
}

export interface StyleCreateInput {
  id?: Maybe<ID_Input>;
  name: String;
  slug: String;
}

export interface TrackWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  title?: Maybe<String>;
  title_not?: Maybe<String>;
  title_in?: Maybe<String[] | String>;
  title_not_in?: Maybe<String[] | String>;
  title_lt?: Maybe<String>;
  title_lte?: Maybe<String>;
  title_gt?: Maybe<String>;
  title_gte?: Maybe<String>;
  title_contains?: Maybe<String>;
  title_not_contains?: Maybe<String>;
  title_starts_with?: Maybe<String>;
  title_not_starts_with?: Maybe<String>;
  title_ends_with?: Maybe<String>;
  title_not_ends_with?: Maybe<String>;
  artist?: Maybe<String>;
  artist_not?: Maybe<String>;
  artist_in?: Maybe<String[] | String>;
  artist_not_in?: Maybe<String[] | String>;
  artist_lt?: Maybe<String>;
  artist_lte?: Maybe<String>;
  artist_gt?: Maybe<String>;
  artist_gte?: Maybe<String>;
  artist_contains?: Maybe<String>;
  artist_not_contains?: Maybe<String>;
  artist_starts_with?: Maybe<String>;
  artist_not_starts_with?: Maybe<String>;
  artist_ends_with?: Maybe<String>;
  artist_not_ends_with?: Maybe<String>;
  duration?: Maybe<Int>;
  duration_not?: Maybe<Int>;
  duration_in?: Maybe<Int[] | Int>;
  duration_not_in?: Maybe<Int[] | Int>;
  duration_lt?: Maybe<Int>;
  duration_lte?: Maybe<Int>;
  duration_gt?: Maybe<Int>;
  duration_gte?: Maybe<Int>;
  playcount?: Maybe<Int>;
  playcount_not?: Maybe<Int>;
  playcount_in?: Maybe<Int[] | Int>;
  playcount_not_in?: Maybe<Int[] | Int>;
  playcount_lt?: Maybe<Int>;
  playcount_lte?: Maybe<Int>;
  playcount_gt?: Maybe<Int>;
  playcount_gte?: Maybe<Int>;
  invalid?: Maybe<Boolean>;
  invalid_not?: Maybe<Boolean>;
  style?: Maybe<StyleWhereInput>;
  user?: Maybe<UserWhereInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<TrackWhereInput[] | TrackWhereInput>;
  OR?: Maybe<TrackWhereInput[] | TrackWhereInput>;
  NOT?: Maybe<TrackWhereInput[] | TrackWhereInput>;
}

export interface StyleUpdateInput {
  name?: Maybe<String>;
  slug?: Maybe<String>;
}

export interface TrackScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  title?: Maybe<String>;
  title_not?: Maybe<String>;
  title_in?: Maybe<String[] | String>;
  title_not_in?: Maybe<String[] | String>;
  title_lt?: Maybe<String>;
  title_lte?: Maybe<String>;
  title_gt?: Maybe<String>;
  title_gte?: Maybe<String>;
  title_contains?: Maybe<String>;
  title_not_contains?: Maybe<String>;
  title_starts_with?: Maybe<String>;
  title_not_starts_with?: Maybe<String>;
  title_ends_with?: Maybe<String>;
  title_not_ends_with?: Maybe<String>;
  artist?: Maybe<String>;
  artist_not?: Maybe<String>;
  artist_in?: Maybe<String[] | String>;
  artist_not_in?: Maybe<String[] | String>;
  artist_lt?: Maybe<String>;
  artist_lte?: Maybe<String>;
  artist_gt?: Maybe<String>;
  artist_gte?: Maybe<String>;
  artist_contains?: Maybe<String>;
  artist_not_contains?: Maybe<String>;
  artist_starts_with?: Maybe<String>;
  artist_not_starts_with?: Maybe<String>;
  artist_ends_with?: Maybe<String>;
  artist_not_ends_with?: Maybe<String>;
  duration?: Maybe<Int>;
  duration_not?: Maybe<Int>;
  duration_in?: Maybe<Int[] | Int>;
  duration_not_in?: Maybe<Int[] | Int>;
  duration_lt?: Maybe<Int>;
  duration_lte?: Maybe<Int>;
  duration_gt?: Maybe<Int>;
  duration_gte?: Maybe<Int>;
  playcount?: Maybe<Int>;
  playcount_not?: Maybe<Int>;
  playcount_in?: Maybe<Int[] | Int>;
  playcount_not_in?: Maybe<Int[] | Int>;
  playcount_lt?: Maybe<Int>;
  playcount_lte?: Maybe<Int>;
  playcount_gt?: Maybe<Int>;
  playcount_gte?: Maybe<Int>;
  invalid?: Maybe<Boolean>;
  invalid_not?: Maybe<Boolean>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<TrackScalarWhereInput[] | TrackScalarWhereInput>;
  OR?: Maybe<TrackScalarWhereInput[] | TrackScalarWhereInput>;
  NOT?: Maybe<TrackScalarWhereInput[] | TrackScalarWhereInput>;
}

export interface StyleUpdateManyMutationInput {
  name?: Maybe<String>;
  slug?: Maybe<String>;
}

export interface TrackUpsertWithWhereUniqueWithoutUserInput {
  where: TrackWhereUniqueInput;
  update: TrackUpdateWithoutUserDataInput;
  create: TrackCreateWithoutUserInput;
}

export interface UserCreateInput {
  id?: Maybe<ID_Input>;
  name: String;
  email: String;
  password: String;
  role: userRole;
  tracks?: Maybe<TrackCreateManyWithoutUserInput>;
}

export interface TrackUpdateWithWhereUniqueWithoutUserInput {
  where: TrackWhereUniqueInput;
  data: TrackUpdateWithoutUserDataInput;
}

export interface TrackUpdateManyMutationInput {
  title?: Maybe<String>;
  artist?: Maybe<String>;
  duration?: Maybe<Int>;
  playcount?: Maybe<Int>;
  invalid?: Maybe<Boolean>;
}

export interface TrackUpdateManyWithoutUserInput {
  create?: Maybe<TrackCreateWithoutUserInput[] | TrackCreateWithoutUserInput>;
  delete?: Maybe<TrackWhereUniqueInput[] | TrackWhereUniqueInput>;
  connect?: Maybe<TrackWhereUniqueInput[] | TrackWhereUniqueInput>;
  set?: Maybe<TrackWhereUniqueInput[] | TrackWhereUniqueInput>;
  disconnect?: Maybe<TrackWhereUniqueInput[] | TrackWhereUniqueInput>;
  update?: Maybe<
    | TrackUpdateWithWhereUniqueWithoutUserInput[]
    | TrackUpdateWithWhereUniqueWithoutUserInput
  >;
  upsert?: Maybe<
    | TrackUpsertWithWhereUniqueWithoutUserInput[]
    | TrackUpsertWithWhereUniqueWithoutUserInput
  >;
  deleteMany?: Maybe<TrackScalarWhereInput[] | TrackScalarWhereInput>;
  updateMany?: Maybe<
    TrackUpdateManyWithWhereNestedInput[] | TrackUpdateManyWithWhereNestedInput
  >;
}

export interface UserUpsertWithoutTracksInput {
  update: UserUpdateWithoutTracksDataInput;
  create: UserCreateWithoutTracksInput;
}

export interface StyleSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<StyleWhereInput>;
  AND?: Maybe<StyleSubscriptionWhereInput[] | StyleSubscriptionWhereInput>;
  OR?: Maybe<StyleSubscriptionWhereInput[] | StyleSubscriptionWhereInput>;
  NOT?: Maybe<StyleSubscriptionWhereInput[] | StyleSubscriptionWhereInput>;
}

export interface StyleCreateOneInput {
  create?: Maybe<StyleCreateInput>;
  connect?: Maybe<StyleWhereUniqueInput>;
}

export interface TrackUpdateManyWithWhereNestedInput {
  where: TrackScalarWhereInput;
  data: TrackUpdateManyDataInput;
}

export interface UserCreateOneWithoutTracksInput {
  create?: Maybe<UserCreateWithoutTracksInput>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface StyleWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  slug?: Maybe<String>;
  slug_not?: Maybe<String>;
  slug_in?: Maybe<String[] | String>;
  slug_not_in?: Maybe<String[] | String>;
  slug_lt?: Maybe<String>;
  slug_lte?: Maybe<String>;
  slug_gt?: Maybe<String>;
  slug_gte?: Maybe<String>;
  slug_contains?: Maybe<String>;
  slug_not_contains?: Maybe<String>;
  slug_starts_with?: Maybe<String>;
  slug_not_starts_with?: Maybe<String>;
  slug_ends_with?: Maybe<String>;
  slug_not_ends_with?: Maybe<String>;
  AND?: Maybe<StyleWhereInput[] | StyleWhereInput>;
  OR?: Maybe<StyleWhereInput[] | StyleWhereInput>;
  NOT?: Maybe<StyleWhereInput[] | StyleWhereInput>;
}

export interface UserUpdateWithoutTracksDataInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<userRole>;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  email?: Maybe<String>;
}>;

export interface StyleUpsertNestedInput {
  update: StyleUpdateDataInput;
  create: StyleCreateInput;
}

export interface StyleUpdateDataInput {
  name?: Maybe<String>;
  slug?: Maybe<String>;
}

export interface StyleUpdateOneRequiredInput {
  create?: Maybe<StyleCreateInput>;
  update?: Maybe<StyleUpdateDataInput>;
  upsert?: Maybe<StyleUpsertNestedInput>;
  connect?: Maybe<StyleWhereUniqueInput>;
}

export interface TrackUpdateInput {
  title?: Maybe<String>;
  artist?: Maybe<String>;
  duration?: Maybe<Int>;
  playcount?: Maybe<Int>;
  invalid?: Maybe<Boolean>;
  style?: Maybe<StyleUpdateOneRequiredInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutTracksInput>;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
  OR?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
  NOT?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface TrackUpdateWithoutUserDataInput {
  title?: Maybe<String>;
  artist?: Maybe<String>;
  duration?: Maybe<Int>;
  playcount?: Maybe<Int>;
  invalid?: Maybe<Boolean>;
  style?: Maybe<StyleUpdateOneRequiredInput>;
}

export interface UserWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  email?: Maybe<String>;
  email_not?: Maybe<String>;
  email_in?: Maybe<String[] | String>;
  email_not_in?: Maybe<String[] | String>;
  email_lt?: Maybe<String>;
  email_lte?: Maybe<String>;
  email_gt?: Maybe<String>;
  email_gte?: Maybe<String>;
  email_contains?: Maybe<String>;
  email_not_contains?: Maybe<String>;
  email_starts_with?: Maybe<String>;
  email_not_starts_with?: Maybe<String>;
  email_ends_with?: Maybe<String>;
  email_not_ends_with?: Maybe<String>;
  password?: Maybe<String>;
  password_not?: Maybe<String>;
  password_in?: Maybe<String[] | String>;
  password_not_in?: Maybe<String[] | String>;
  password_lt?: Maybe<String>;
  password_lte?: Maybe<String>;
  password_gt?: Maybe<String>;
  password_gte?: Maybe<String>;
  password_contains?: Maybe<String>;
  password_not_contains?: Maybe<String>;
  password_starts_with?: Maybe<String>;
  password_not_starts_with?: Maybe<String>;
  password_ends_with?: Maybe<String>;
  password_not_ends_with?: Maybe<String>;
  role?: Maybe<userRole>;
  role_not?: Maybe<userRole>;
  role_in?: Maybe<userRole[] | userRole>;
  role_not_in?: Maybe<userRole[] | userRole>;
  tracks_every?: Maybe<TrackWhereInput>;
  tracks_some?: Maybe<TrackWhereInput>;
  tracks_none?: Maybe<TrackWhereInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
  OR?: Maybe<UserWhereInput[] | UserWhereInput>;
  NOT?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export interface UserUpdateManyMutationInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<userRole>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface UserPreviousValues {
  id: ID_Output;
  name: String;
  email: String;
  password: String;
  role: userRole;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  role: () => Promise<userRole>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  role: () => Promise<AsyncIterator<userRole>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface StyleConnection {
  pageInfo: PageInfo;
  edges: StyleEdge[];
}

export interface StyleConnectionPromise
  extends Promise<StyleConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<StyleEdge>>() => T;
  aggregate: <T = AggregateStylePromise>() => T;
}

export interface StyleConnectionSubscription
  extends Promise<AsyncIterator<StyleConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<StyleEdgeSubscription>>>() => T;
  aggregate: <T = AggregateStyleSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface TrackPreviousValues {
  id: ID_Output;
  title: String;
  artist: String;
  duration: Int;
  playcount: Int;
  invalid?: Boolean;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface TrackPreviousValuesPromise
  extends Promise<TrackPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  artist: () => Promise<String>;
  duration: () => Promise<Int>;
  playcount: () => Promise<Int>;
  invalid: () => Promise<Boolean>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface TrackPreviousValuesSubscription
  extends Promise<AsyncIterator<TrackPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  artist: () => Promise<AsyncIterator<String>>;
  duration: () => Promise<AsyncIterator<Int>>;
  playcount: () => Promise<AsyncIterator<Int>>;
  invalid: () => Promise<AsyncIterator<Boolean>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface StyleEdge {
  node: Style;
  cursor: String;
}

export interface StyleEdgePromise extends Promise<StyleEdge>, Fragmentable {
  node: <T = StylePromise>() => T;
  cursor: () => Promise<String>;
}

export interface StyleEdgeSubscription
  extends Promise<AsyncIterator<StyleEdge>>,
    Fragmentable {
  node: <T = StyleSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface TrackSubscriptionPayload {
  mutation: MutationType;
  node: Track;
  updatedFields: String[];
  previousValues: TrackPreviousValues;
}

export interface TrackSubscriptionPayloadPromise
  extends Promise<TrackSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = TrackPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = TrackPreviousValuesPromise>() => T;
}

export interface TrackSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<TrackSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = TrackSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = TrackPreviousValuesSubscription>() => T;
}

export interface User {
  id: ID_Output;
  name: String;
  email: String;
  password: String;
  role: userRole;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  role: () => Promise<userRole>;
  tracks: <T = FragmentableArray<Track>>(args?: {
    where?: TrackWhereInput;
    orderBy?: TrackOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  role: () => Promise<AsyncIterator<userRole>>;
  tracks: <T = Promise<AsyncIterator<TrackSubscription>>>(args?: {
    where?: TrackWhereInput;
    orderBy?: TrackOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  role: () => Promise<userRole>;
  tracks: <T = FragmentableArray<Track>>(args?: {
    where?: TrackWhereInput;
    orderBy?: TrackOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface Track {
  id: ID_Output;
  title: String;
  artist: String;
  duration: Int;
  playcount: Int;
  invalid?: Boolean;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface TrackPromise extends Promise<Track>, Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  artist: () => Promise<String>;
  duration: () => Promise<Int>;
  playcount: () => Promise<Int>;
  invalid: () => Promise<Boolean>;
  style: <T = StylePromise>() => T;
  user: <T = UserPromise>() => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface TrackSubscription
  extends Promise<AsyncIterator<Track>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  artist: () => Promise<AsyncIterator<String>>;
  duration: () => Promise<AsyncIterator<Int>>;
  playcount: () => Promise<AsyncIterator<Int>>;
  invalid: () => Promise<AsyncIterator<Boolean>>;
  style: <T = StyleSubscription>() => T;
  user: <T = UserSubscription>() => T;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface TrackNullablePromise
  extends Promise<Track | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  artist: () => Promise<String>;
  duration: () => Promise<Int>;
  playcount: () => Promise<Int>;
  invalid: () => Promise<Boolean>;
  style: <T = StylePromise>() => T;
  user: <T = UserPromise>() => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface TrackEdge {
  node: Track;
  cursor: String;
}

export interface TrackEdgePromise extends Promise<TrackEdge>, Fragmentable {
  node: <T = TrackPromise>() => T;
  cursor: () => Promise<String>;
}

export interface TrackEdgeSubscription
  extends Promise<AsyncIterator<TrackEdge>>,
    Fragmentable {
  node: <T = TrackSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface StylePreviousValues {
  id: ID_Output;
  name: String;
  slug: String;
}

export interface StylePreviousValuesPromise
  extends Promise<StylePreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  slug: () => Promise<String>;
}

export interface StylePreviousValuesSubscription
  extends Promise<AsyncIterator<StylePreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  slug: () => Promise<AsyncIterator<String>>;
}

export interface StyleSubscriptionPayload {
  mutation: MutationType;
  node: Style;
  updatedFields: String[];
  previousValues: StylePreviousValues;
}

export interface StyleSubscriptionPayloadPromise
  extends Promise<StyleSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = StylePromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = StylePreviousValuesPromise>() => T;
}

export interface StyleSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<StyleSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = StyleSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = StylePreviousValuesSubscription>() => T;
}

export interface Style {
  id: ID_Output;
  name: String;
  slug: String;
}

export interface StylePromise extends Promise<Style>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  slug: () => Promise<String>;
}

export interface StyleSubscription
  extends Promise<AsyncIterator<Style>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  slug: () => Promise<AsyncIterator<String>>;
}

export interface StyleNullablePromise
  extends Promise<Style | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  slug: () => Promise<String>;
}

export interface AggregateStyle {
  count: Int;
}

export interface AggregateStylePromise
  extends Promise<AggregateStyle>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateStyleSubscription
  extends Promise<AsyncIterator<AggregateStyle>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface TrackConnection {
  pageInfo: PageInfo;
  edges: TrackEdge[];
}

export interface TrackConnectionPromise
  extends Promise<TrackConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<TrackEdge>>() => T;
  aggregate: <T = AggregateTrackPromise>() => T;
}

export interface TrackConnectionSubscription
  extends Promise<AsyncIterator<TrackConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<TrackEdgeSubscription>>>() => T;
  aggregate: <T = AggregateTrackSubscription>() => T;
}

export interface AggregateTrack {
  count: Int;
}

export interface AggregateTrackPromise
  extends Promise<AggregateTrack>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateTrackSubscription
  extends Promise<AsyncIterator<AggregateTrack>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

export type Long = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Style",
    embedded: false
  },
  {
    name: "Track",
    embedded: false
  },
  {
    name: "userRole",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
export const prisma = new Prisma();
