import { truncate } from '@rvohealth/dream/spec-helpers'

beforeEach(async () => {
  await truncate()
}, 15000)
