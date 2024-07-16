import { DreamColumn, HasMany, HasOne } from '@rvohealth/dream'
import UserSerializer, { UserSummarySerializer } from '../../app/serializers/UserSerializer'
import ApplicationModel from './ApplicationModel'
import Post from './Post'
import Snapshotable from '../../../src/snapshotable'
import HideFromSnapshotable from '../../../src/hide-from-snapshots'

export default class User extends Snapshotable(ApplicationModel) {
  public get table() {
    return 'users' as const
  }

  public get serializers() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default: UserSerializer<any, any>,

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      summary: UserSummarySerializer<any, any>,
    } as const
  }

  public id: DreamColumn<User, 'id'>
  public email: DreamColumn<User, 'email'>
  public name: DreamColumn<User, 'name'>
  public createdAt: DreamColumn<User, 'createdAt'>
  public updatedAt: DreamColumn<User, 'updatedAt'>

  @HideFromSnapshotable()
  public loginCount: DreamColumn<User, 'loginCount'>

  @HasMany(() => Post)
  public posts: Post[]

  @HasOne(() => Post, { order: { id: 'desc' } })
  public mostRecentPost: Post | null
}
