import { DreamApp } from '@rvoh/dream'
import dreamConfCb from '../../conf/dream.js'

export default async function initializeDreamApp() {
  return await DreamApp.init(dreamConfCb)
}
