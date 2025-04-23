#!/usr/bin/env node

// nice reference for shell commands:
// https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
// commanderjs docs:
// https://github.com/tj/commander.js#quick-start

import '../conf/loadEnv'

import { DreamCLI } from '@rvoh/dream'
import { Command } from 'commander'
import initializeDreamApp from './helpers/initializeDreamApp'

const program = new Command()

DreamCLI.provide(program, {
  initializeDreamApp,
  seedDb: () => {},
})

program.parse(process.argv)
