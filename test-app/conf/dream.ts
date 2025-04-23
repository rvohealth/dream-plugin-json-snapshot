import { DreamApp } from '@rvoh/dream'
import importAll from '../app/helpers/importAll'
import importDefault from '../app/helpers/importDefault'
import srcPath from '../app/helpers/srcPath'
import inflections from './inflections'

export default async function (dreamApp: DreamApp) {
  await dreamApp.load('models', srcPath('app', 'models'), path => importDefault(path))
  await dreamApp.load('serializers', srcPath('app', 'serializers'), path => importAll(path))
  await dreamApp.load('services', srcPath('app', 'services'), path => importDefault(path))

  dreamApp.set('projectRoot', srcPath('..'))
  dreamApp.set('primaryKeyType', 'bigserial')
  dreamApp.set('inflections', inflections)

  // provides a list of path overrides for your app. This is optional, and will default
  // to the paths expected for a typical psychic application.
  dreamApp.set('paths', {
    conf: 'test-app/conf',
    db: 'test-app/db',
    factories: 'test-app/spec/factories',
    models: 'test-app/app/models',
    serializers: 'test-app/app/serializers',
    services: 'test-app/app/services',
    modelSpecs: 'test-app/spec/unit/models',
    types: 'test-app/types',
  })

  dreamApp.set('parallelTests', Number(process.env.DREAM_PARALLEL_TESTS))

  // provides db credentials and configuration for your app.
  dreamApp.set('db', {
    primary: {
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      host: process.env.DB_HOST!,
      name: process.env.DB_NAME!,
      port: parseInt(process.env.DB_PORT!),
      useSsl: process.env.DB_USE_SSL === '1',
    },
    replica: {
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      host: process.env.REPLICA_DB_HOST!,
      name: process.env.REPLICA_DB_NAME!,
      port: parseInt(process.env.DB_PORT!),
      useSsl: process.env.DB_USE_SSL === '1',
    },
  })
}
