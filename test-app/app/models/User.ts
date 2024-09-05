import { DreamColumn } from '@rvohealth/dream'
import HideFromSnapshotable from '../../../src/hide-from-snapshots'
import Snapshotable from '../../../src/snapshotable'
import ApplicationModel from './ApplicationModel'
import Post from './Post'

export default class User extends Snapshotable(ApplicationModel) {
  public get table() {
    return 'users' as const
  }

  public id: DreamColumn<User, 'id'>
  public email: DreamColumn<User, 'email'>
  public name: DreamColumn<User, 'name'>
  public createdAt: DreamColumn<User, 'createdAt'>
  public updatedAt: DreamColumn<User, 'updatedAt'>

  @HideFromSnapshotable()
  public loginCount: DreamColumn<User, 'loginCount'>

  @User.HasMany('Post')
  public posts: Post[]

  @User.HasOne('Post', { order: { id: 'desc' } })
  public mostRecentPost: Post | null
}
