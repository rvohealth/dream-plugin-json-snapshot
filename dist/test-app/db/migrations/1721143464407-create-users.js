"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function up(db) {
    await db.schema
        .createTable('users')
        .addColumn('id', 'bigserial', col => col.primaryKey())
        .addColumn('email', 'varchar(255)')
        .addColumn('name', 'varchar(255)')
        .addColumn('login_count', 'integer')
        .addColumn('created_at', 'timestamp', col => col.notNull())
        .addColumn('updated_at', 'timestamp', col => col.notNull())
        .execute();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function down(db) {
    await db.schema.dropTable('users').execute();
}
