"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dream_1 = require("@rvohealth/dream");
const schema_1 = require("../../db/schema");
const sync_1 = require("../../db/sync");
const env = {
    db: {
        development: {
            primary: {
                user: 'DB_USER',
                password: 'DB_PASSWORD',
                host: 'DB_HOST',
                name: 'DB_NAME',
                port: 'DB_PORT',
                use_ssl: 'DB_USE_SSL',
            },
            replica: {
                user: 'DB_USER',
                password: 'DB_PASSWORD',
                host: 'REPLICA_DB_HOST',
                name: 'REPLICA_DB_NAME',
                port: 'DB_PORT',
                use_ssl: 'DB_USE_SSL',
            },
        },
        test: {
            primary: {
                user: 'DB_USER',
                password: 'DB_PASSWORD',
                host: 'DB_HOST',
                name: 'DB_NAME',
                port: 'DB_PORT',
                use_ssl: 'DB_USE_SSL',
            },
            replica: {
                user: 'DB_USER',
                password: 'DB_PASSWORD',
                host: 'REPLICA_DB_HOST',
                name: 'REPLICA_DB_NAME',
                port: 'DB_PORT',
                use_ssl: 'DB_USE_SSL',
            },
        },
        production: {
            primary: {
                user: 'DB_USER',
                password: 'DB_PASSWORD',
                host: 'DB_HOST',
                name: 'DB_NAME',
                port: 'DB_PORT',
                use_ssl: 'DB_USE_SSL',
            },
            replica: {
                user: 'DB_USER',
                password: 'DB_PASSWORD',
                host: 'REPLICA_DB_HOST',
                name: 'REPLICA_DB_NAME',
                port: 'DB_PORT',
                use_ssl: 'DB_USE_SSL',
            },
        },
    },
};
const dreamconf = new dream_1.Dreamconf({
    DB: new sync_1.DBClass(),
    env,
    globalSchema: schema_1.globalSchema,
    schema: schema_1.schema,
});
exports.default = dreamconf;
