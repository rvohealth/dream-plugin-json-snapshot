import { DreamApp } from '@rvoh/dream'
import dreamConfCb from '../../conf/dream.js'

export default async function initializeDreamApp(opts?: Parameters<typeof DreamApp.init>[1]) {
  return await DreamApp.init(dreamConfCb, opts)
}
