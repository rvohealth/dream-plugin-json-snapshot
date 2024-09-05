import { DreamApplication } from '@rvohealth/dream'
import { truncate } from '@rvohealth/dream-spec-helpers'
import initializeDreamApplication from '../../test-app/cli/helpers/initializeDreamApplication'

beforeEach(async () => {
  await initializeDreamApplication()
  await truncate(DreamApplication)
}, 15000)
