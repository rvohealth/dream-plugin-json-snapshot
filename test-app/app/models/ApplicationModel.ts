import { Dream } from '@rvohealth/dream'
import { DBClass } from '../../types/db'
import { globalSchema, schema } from '../../types/dream'

export default class ApplicationModel extends Dream {
  public declare DB: DBClass

  public get schema() {
    return schema
  }

  public get globalSchema() {
    return globalSchema
  }
}
