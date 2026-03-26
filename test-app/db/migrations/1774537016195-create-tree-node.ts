import { Kysely } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('tree_nodes')
    .addColumn('id', 'bigserial', col => col.primaryKey())
    .addColumn('name', 'varchar(255)', col => col.notNull())
    .addColumn('tree_node_id', 'bigint', col => col.references('tree_nodes.id').onDelete('restrict'))
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .execute()

  await db.schema.createIndex('tree_nodes_tree_node_id').on('tree_nodes').column('tree_node_id').execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex('tree_nodes_tree_node_id').execute()
  await db.schema.dropTable('tree_nodes').execute()
}
