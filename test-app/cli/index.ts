#!/usr/bin/env node

// nice reference for shell commands:
// https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
// commanderjs docs:
// https://github.com/tj/commander.js#quick-start

import '../conf/loadEnv'

import { DreamBin, developmentOrTestEnv } from '@rvohealth/dream'
import { Command } from 'commander'
import initializeDreamApplication from './helpers/initializeDreamApplication'

const program = new Command()

function cmdargs() {
  return process.argv.slice(3, process.argv.length)
}

program
  .command('generate:migration')
  .alias('g:migration')
  .description('g:migration <name> create a new dream migration')
  .argument('<name>', 'name of the migration')
  .action(async () => {
    await initializeDreamApplication()
    await DreamBin.generateMigration()
    process.exit()
  })

program
  .command('generate:dream')
  .alias('generate:model')
  .alias('g:dream')
  .alias('g:model')
  .description('generate:dream <name> [...attributes] create a new dream')
  .argument('<name>', 'name of the dream')
  .action(async () => {
    await initializeDreamApplication()
    await DreamBin.generateDream()
    process.exit()
  })

program
  .command('generate:sti-child')
  .alias('g:sti-child')
  .description('generate:dream <name> extends <base-name> [...attributes] create a new dream')
  .argument('<name>', 'name of the dream')
  .argument('<base-name>', 'name of the parent dream')
  .action(async () => {
    await initializeDreamApplication()
    await DreamBin.generateStiChild()
    process.exit()
  })

program
  .command('generate:factory')
  .alias('g:factory')
  .description('generate:factory [...attributes] create a new factory for a dream')
  .argument('<name>', 'name of the dream')
  .action(async () => {
    await initializeDreamApplication()
    await DreamBin.generateFactory()
    process.exit()
  })

program
  .command('sync')
  .description(
    'sync introspects your database, updating your schema to reflect, and then syncs the new schema with the installed dream node module, allowing it provide your schema to the underlying kysely integration'
  )
  .action(async () => {
    await initializeDreamApplication()
    await DreamBin.sync()
    process.exit()
  })

program
  .command('db:create')
  .description(
    'creates a new database, seeding from local .env or .env.test if NODE_ENV=test is set for env vars'
  )
  .option(
    '--bypass-config-cache',
    'bypasses running type cache build (this is typically used internally only)'
  )
  .action(async () => {
    await initializeDreamApplication()
    await DreamBin.dbCreate()
    process.exit()
  })

program
  .command('db:migrate')
  .description('db:migrate runs any outstanding database migrations')
  .option('--skip-sync', 'skips syncing local schema after running migrations')
  .option(
    '--bypass-config-cache',
    'bypasses running type cache build (this is typically used internally only)'
  )
  .action(async () => {
    await initializeDreamApplication()
    await DreamBin.dbMigrate()

    if (developmentOrTestEnv() && !cmdargs().includes('--skip-sync')) {
      await DreamBin.sync()
    }

    process.exit()
  })

program
  .command('db:rollback')
  .description('db:rollback rolls back the migration')
  .option('--step <integer>', '--step <integer> number of steps back to travel')
  .option('--core', 'sets core to true')
  .option(
    '--bypass-config-cache',
    'bypasses running type cache build (this is typically used internally only)'
  )
  .action(async () => {
    await initializeDreamApplication()
    await DreamBin.dbRollback()
    await DreamBin.sync()
    process.exit()
  })

program
  .command('db:drop')
  .description(
    'drops the database, seeding from local .env or .env.test if NODE_ENV=test is set for env vars'
  )
  .option('--core', 'sets core to true')
  .option(
    '--bypass-config-cache',
    'bypasses running type cache build (this is typically used internally only)'
  )
  .action(async () => {
    await initializeDreamApplication()
    await DreamBin.dbDrop()
    process.exit()
  })

program
  .command('db:reset')
  .description('db:reset runs db:drop (safely), then db:create, then db:migrate')
  .option('--core', 'sets core to true')
  .action(async () => {
    await initializeDreamApplication()
    await DreamBin.dbDrop()
    await DreamBin.dbCreate()
    await DreamBin.dbMigrate()
    await DreamBin.sync()
    process.exit()
  })

program.parse(process.argv)
