import { Dream } from '@rvoh/dream'
import { DBClass } from '../../types/db.js'
import { connectionTypeConfig, schema } from '../../types/dream.js'
import { globalTypeConfig } from '../../types/dream.globals.js'

export default class ApplicationModel extends Dream {
  public declare DB: DBClass

  public get schema() {
    return schema
  }

  public get connectionTypeConfig() {
    return connectionTypeConfig
  }

  public get globalTypeConfig() {
    return globalTypeConfig
  }
}
