"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalSchema = exports.schema = void 0;
exports.schema = {
    comments: {
        primaryKey: 'id',
        createdAtField: 'createdAt',
        updatedAtField: 'updatedAt',
        deletedAtField: 'deletedAt',
        scopes: {
            default: [],
            named: [],
        },
        columns: {
            body: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'character varying',
                allowNull: true,
                isArray: false,
            },
            createdAt: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'timestamp without time zone',
                allowNull: false,
                isArray: false,
            },
            id: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'bigint',
                allowNull: false,
                isArray: false,
            },
            numLikes: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'integer',
                allowNull: true,
                isArray: false,
            },
            postId: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'bigint',
                allowNull: false,
                isArray: false,
            },
            updatedAt: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'timestamp without time zone',
                allowNull: false,
                isArray: false,
            },
            userId: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'bigint',
                allowNull: false,
                isArray: false,
            },
        },
        virtualColumns: [],
        associations: {
            post: {
                type: 'BelongsTo',
                foreignKey: 'postId',
                tables: ['posts'],
                optional: false,
                requiredWhereClauses: null,
            },
            user: {
                type: 'BelongsTo',
                foreignKey: 'userId',
                tables: ['users'],
                optional: false,
                requiredWhereClauses: null,
            },
        },
    },
    posts: {
        primaryKey: 'id',
        createdAtField: 'createdAt',
        updatedAtField: 'updatedAt',
        deletedAtField: 'deletedAt',
        scopes: {
            default: [],
            named: [],
        },
        columns: {
            body: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'character varying',
                allowNull: true,
                isArray: false,
            },
            createdAt: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'timestamp without time zone',
                allowNull: false,
                isArray: false,
            },
            id: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'bigint',
                allowNull: false,
                isArray: false,
            },
            subtitle: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'character varying',
                allowNull: true,
                isArray: false,
            },
            title: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'character varying',
                allowNull: true,
                isArray: false,
            },
            updatedAt: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'timestamp without time zone',
                allowNull: false,
                isArray: false,
            },
            userId: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'bigint',
                allowNull: false,
                isArray: false,
            },
        },
        virtualColumns: [],
        associations: {
            comments: {
                type: 'HasMany',
                foreignKey: 'postId',
                tables: ['comments'],
                optional: null,
                requiredWhereClauses: null,
            },
            mostRecentComment: {
                type: 'HasOne',
                foreignKey: 'postId',
                tables: ['comments'],
                optional: null,
                requiredWhereClauses: null,
            },
            mostRecentNullComment: {
                type: 'HasOne',
                foreignKey: 'postId',
                tables: ['comments'],
                optional: null,
                requiredWhereClauses: null,
            },
            nullComments: {
                type: 'HasMany',
                foreignKey: 'postId',
                tables: ['comments'],
                optional: null,
                requiredWhereClauses: null,
            },
            user: {
                type: 'BelongsTo',
                foreignKey: 'userId',
                tables: ['users'],
                optional: false,
                requiredWhereClauses: null,
            },
        },
    },
    users: {
        primaryKey: 'id',
        createdAtField: 'createdAt',
        updatedAtField: 'updatedAt',
        deletedAtField: 'deletedAt',
        scopes: {
            default: [],
            named: [],
        },
        columns: {
            createdAt: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'timestamp without time zone',
                allowNull: false,
                isArray: false,
            },
            email: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'character varying',
                allowNull: true,
                isArray: false,
            },
            id: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'bigint',
                allowNull: false,
                isArray: false,
            },
            loginCount: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'integer',
                allowNull: true,
                isArray: false,
            },
            name: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'character varying',
                allowNull: true,
                isArray: false,
            },
            updatedAt: {
                coercedType: {},
                enumType: null,
                enumValues: null,
                dbType: 'timestamp without time zone',
                allowNull: false,
                isArray: false,
            },
        },
        virtualColumns: [],
        associations: {
            mostRecentPost: {
                type: 'HasOne',
                foreignKey: 'userId',
                tables: ['posts'],
                optional: null,
                requiredWhereClauses: null,
            },
            posts: {
                type: 'HasMany',
                foreignKey: 'userId',
                tables: ['posts'],
                optional: null,
                requiredWhereClauses: null,
            },
        },
    },
};
exports.globalSchema = {
    passthroughColumns: [],
    allDefaultScopeNames: [],
};
