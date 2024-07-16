import { DreamSerializer, Attribute, DreamColumn } from '@rvohealth/dream'
import User from '../models/User'

export class UserSummarySerializer<DataType extends User, Passthrough extends object> extends DreamSerializer<
  DataType,
  Passthrough
> {
  @Attribute('string')
  public id: DreamColumn<User, 'id'>
}

export default class UserSerializer<
  DataType extends User,
  Passthrough extends object,
> extends UserSummarySerializer<DataType, Passthrough> {
  @Attribute('string')
  public email: DreamColumn<User, 'email'>

  @Attribute('string')
  public name: DreamColumn<User, 'name'>

  @Attribute('number')
  public loginCount: DreamColumn<User, 'loginCount'>
}
