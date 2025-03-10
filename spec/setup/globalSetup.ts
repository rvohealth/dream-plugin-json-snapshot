import '../../test-app/conf/loadEnv'

import initializeDreamApplication from '../../test-app/cli/helpers/initializeDreamApplication'

export async function setup() {
  await initializeDreamApplication()
}

export async function teardown() {}
