import { Dream, DreamApp } from '@rvoh/dream'
import { provideDreamViteMatchers, truncate } from '@rvoh/dream-spec-helpers'
import initializeDreamApp from '../../test-app/cli/helpers/initializeDreamApp.js'

provideDreamViteMatchers(Dream)

beforeEach(async () => {
  await initializeDreamApp()
  await truncate(DreamApp)
})
