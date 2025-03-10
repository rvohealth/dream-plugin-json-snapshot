import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    dir: './spec',
    globals: true,
    setupFiles: ['luxon-jest-matchers', './spec/setup/hooks.ts'],
    fileParallelism: false,
    maxConcurrency: 1,
    maxWorkers: 1,
    minWorkers: 1,
    mockReset: true,
    watch: false,

    globalSetup: './spec/setup/globalSetup.ts',
  },
})
