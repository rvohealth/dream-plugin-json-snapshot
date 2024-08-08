"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function up(db) {
    await db.schema
        .createTable('comments')
        .addColumn('id', 'bigserial', col => col.primaryKey())
        .addColumn('user_id', 'bigint', col => col.references('users.id').onDelete('restrict').notNull())
        .addColumn('post_id', 'bigint', col => col.references('posts.id').onDelete('restrict').notNull())
        .addColumn('body', 'varchar(255)')
        .addColumn('num_likes', 'integer')
        .addColumn('created_at', 'timestamp', col => col.notNull())
        .addColumn('updated_at', 'timestamp', col => col.notNull())
        .execute();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function down(db) {
    await db.schema.dropTable('comments').execute();
}
