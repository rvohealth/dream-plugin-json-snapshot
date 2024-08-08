"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function up(db) {
    await db.schema
        .createTable('posts')
        .addColumn('id', 'bigserial', col => col.primaryKey())
        .addColumn('user_id', 'bigint', col => col.references('users.id').onDelete('restrict').notNull())
        .addColumn('body', 'varchar(255)')
        .addColumn('title', 'varchar(255)')
        .addColumn('subtitle', 'varchar(255)')
        .addColumn('created_at', 'timestamp', col => col.notNull())
        .addColumn('updated_at', 'timestamp', col => col.notNull())
        .execute();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function down(db) {
    await db.schema.dropTable('posts').execute();
}
