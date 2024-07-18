import { Dreamconf } from '@rvohealth/dream'
import { globalSchema, schema } from '../../db/schema'
import { DBClass } from '../../db/sync'

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
}

const dreamconf = new Dreamconf<DBClass, typeof schema, typeof globalSchema>({
  DB: new DBClass(),
  env,
  globalSchema,
  schema,
})

export default dreamconf
