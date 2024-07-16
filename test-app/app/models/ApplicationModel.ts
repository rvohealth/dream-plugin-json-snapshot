import { Dream, Dreamconf } from '@rvohealth/dream'
import { DBClass } from '../../db/sync'
import { globalSchema, schema } from '../../db/schema'
import dreamconf from '../conf/dreamconf'

export default class ApplicationModel extends Dream {
  public get dreamconf(): Dreamconf<DBClass, typeof schema, typeof globalSchema> {
    return dreamconf
  }
}
