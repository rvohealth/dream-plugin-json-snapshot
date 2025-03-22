import { Decorators, DreamColumn } from '@rvoh/dream'
import HideFromSnapshotable from '../../../src/hide-from-snapshots'
import Snapshotable from '../../../src/snapshotable'
import ApplicationModel from './ApplicationModel'
import Comment from './Comment'
import Post from './Post'

const Deco = new Decorators<InstanceType<typeof User>>()

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

  @Deco.HasMany('Post')
  public posts: Post[]

  @Deco.HasMany('Comment', { through: 'posts' })
  public comments: Comment[]

  @Deco.HasOne('Post')
  public mostRecentPost: Post | null
}
