import { DateTime } from 'luxon';
import { IdType } from './sync';
export declare const schema: {
    readonly comments: {
        readonly primaryKey: "id";
        readonly createdAtField: "createdAt";
        readonly updatedAtField: "updatedAt";
        readonly deletedAtField: "deletedAt";
        readonly scopes: {
            readonly default: readonly [];
            readonly named: readonly [];
        };
        readonly columns: {
            readonly body: {
                readonly coercedType: string | null;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "character varying";
                readonly allowNull: true;
                readonly isArray: false;
            };
            readonly createdAt: {
                readonly coercedType: DateTime;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "timestamp without time zone";
                readonly allowNull: false;
                readonly isArray: false;
            };
            readonly id: {
                readonly coercedType: IdType;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "bigint";
                readonly allowNull: false;
                readonly isArray: false;
            };
            readonly numLikes: {
                readonly coercedType: number | null;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "integer";
                readonly allowNull: true;
                readonly isArray: false;
            };
            readonly postId: {
                readonly coercedType: IdType;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "bigint";
                readonly allowNull: false;
                readonly isArray: false;
            };
            readonly updatedAt: {
                readonly coercedType: DateTime;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "timestamp without time zone";
                readonly allowNull: false;
                readonly isArray: false;
            };
            readonly userId: {
                readonly coercedType: IdType;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "bigint";
                readonly allowNull: false;
                readonly isArray: false;
            };
        };
        readonly virtualColumns: readonly [];
        readonly associations: {
            readonly post: {
                readonly type: "BelongsTo";
                readonly foreignKey: "postId";
                readonly tables: readonly ["posts"];
                readonly optional: false;
                readonly requiredWhereClauses: null;
            };
            readonly user: {
                readonly type: "BelongsTo";
                readonly foreignKey: "userId";
                readonly tables: readonly ["users"];
                readonly optional: false;
                readonly requiredWhereClauses: null;
            };
        };
    };
    readonly posts: {
        readonly primaryKey: "id";
        readonly createdAtField: "createdAt";
        readonly updatedAtField: "updatedAt";
        readonly deletedAtField: "deletedAt";
        readonly scopes: {
            readonly default: readonly [];
            readonly named: readonly [];
        };
        readonly columns: {
            readonly body: {
                readonly coercedType: string | null;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "character varying";
                readonly allowNull: true;
                readonly isArray: false;
            };
            readonly createdAt: {
                readonly coercedType: DateTime;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "timestamp without time zone";
                readonly allowNull: false;
                readonly isArray: false;
            };
            readonly id: {
                readonly coercedType: IdType;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "bigint";
                readonly allowNull: false;
                readonly isArray: false;
            };
            readonly subtitle: {
                readonly coercedType: string | null;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "character varying";
                readonly allowNull: true;
                readonly isArray: false;
            };
            readonly title: {
                readonly coercedType: string | null;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "character varying";
                readonly allowNull: true;
                readonly isArray: false;
            };
            readonly updatedAt: {
                readonly coercedType: DateTime;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "timestamp without time zone";
                readonly allowNull: false;
                readonly isArray: false;
            };
            readonly userId: {
                readonly coercedType: IdType;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "bigint";
                readonly allowNull: false;
                readonly isArray: false;
            };
        };
        readonly virtualColumns: readonly [];
        readonly associations: {
            readonly comments: {
                readonly type: "HasMany";
                readonly foreignKey: "postId";
                readonly tables: readonly ["comments"];
                readonly optional: null;
                readonly requiredWhereClauses: null;
            };
            readonly mostRecentComment: {
                readonly type: "HasOne";
                readonly foreignKey: "postId";
                readonly tables: readonly ["comments"];
                readonly optional: null;
                readonly requiredWhereClauses: null;
            };
            readonly mostRecentNullComment: {
                readonly type: "HasOne";
                readonly foreignKey: "postId";
                readonly tables: readonly ["comments"];
                readonly optional: null;
                readonly requiredWhereClauses: null;
            };
            readonly nullComments: {
                readonly type: "HasMany";
                readonly foreignKey: "postId";
                readonly tables: readonly ["comments"];
                readonly optional: null;
                readonly requiredWhereClauses: null;
            };
            readonly user: {
                readonly type: "BelongsTo";
                readonly foreignKey: "userId";
                readonly tables: readonly ["users"];
                readonly optional: false;
                readonly requiredWhereClauses: null;
            };
        };
    };
    readonly users: {
        readonly primaryKey: "id";
        readonly createdAtField: "createdAt";
        readonly updatedAtField: "updatedAt";
        readonly deletedAtField: "deletedAt";
        readonly scopes: {
            readonly default: readonly [];
            readonly named: readonly [];
        };
        readonly columns: {
            readonly createdAt: {
                readonly coercedType: DateTime;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "timestamp without time zone";
                readonly allowNull: false;
                readonly isArray: false;
            };
            readonly email: {
                readonly coercedType: string | null;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "character varying";
                readonly allowNull: true;
                readonly isArray: false;
            };
            readonly id: {
                readonly coercedType: IdType;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "bigint";
                readonly allowNull: false;
                readonly isArray: false;
            };
            readonly loginCount: {
                readonly coercedType: number | null;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "integer";
                readonly allowNull: true;
                readonly isArray: false;
            };
            readonly name: {
                readonly coercedType: string | null;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "character varying";
                readonly allowNull: true;
                readonly isArray: false;
            };
            readonly updatedAt: {
                readonly coercedType: DateTime;
                readonly enumType: null;
                readonly enumValues: null;
                readonly dbType: "timestamp without time zone";
                readonly allowNull: false;
                readonly isArray: false;
            };
        };
        readonly virtualColumns: readonly [];
        readonly associations: {
            readonly mostRecentPost: {
                readonly type: "HasOne";
                readonly foreignKey: "userId";
                readonly tables: readonly ["posts"];
                readonly optional: null;
                readonly requiredWhereClauses: null;
            };
            readonly posts: {
                readonly type: "HasMany";
                readonly foreignKey: "userId";
                readonly tables: readonly ["posts"];
                readonly optional: null;
                readonly requiredWhereClauses: null;
            };
        };
    };
};
export declare const globalSchema: {
    readonly passthroughColumns: readonly [];
    readonly allDefaultScopeNames: readonly [];
};
