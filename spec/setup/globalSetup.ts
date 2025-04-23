import '../../test-app/conf/loadEnv'

import initializeDreamApp from '../../test-app/cli/helpers/initializeDreamApp'

export async function setup() {
  await initializeDreamApp()
}

export async function teardown() {}
