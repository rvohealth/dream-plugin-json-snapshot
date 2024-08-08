import { CalendarDate } from '@rvohealth/dream';
import { DateTime } from 'luxon';
import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;
export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;
export type IdType = string | number | bigint;
export type Timestamp = ColumnType<DateTime | CalendarDate>;
export interface Comments {
    body: string | null;
    createdAt: Timestamp;
    id: Generated<Int8>;
    numLikes: number | null;
    postId: Int8;
    updatedAt: Timestamp;
    userId: Int8;
}
export interface Posts {
    body: string | null;
    createdAt: Timestamp;
    id: Generated<Int8>;
    subtitle: string | null;
    title: string | null;
    updatedAt: Timestamp;
    userId: Int8;
}
export interface Users {
    createdAt: Timestamp;
    email: string | null;
    id: Generated<Int8>;
    loginCount: number | null;
    name: string | null;
    updatedAt: Timestamp;
}
export interface DB {
    comments: Comments;
    posts: Posts;
    users: Users;
}
export declare class DBClass {
    comments: Comments;
    posts: Posts;
    users: Users;
}
