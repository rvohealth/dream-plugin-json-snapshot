import { Decorators, DreamColumn, DreamConst } from '@rvoh/dream'
import SnapshotableFollowThrough from '../../../src/SnapshotableFollowThrough'
import SnapshotableHide from '../../../src/SnapshotableHide'
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

  @SnapshotableHide()
  public loginCount: DreamColumn<User, 'loginCount'>

  @Deco.HasMany('Post')
  public posts: Post[]

  @Deco.HasMany('Post', { on: { title: DreamConst.required } })
  public postsWithRequiredOnClause: Post[]

  @Deco.HasMany('Post', { on: { title: DreamConst.passthrough } })
  public postsWithPassthroughOnClause: Post[]

  @Deco.HasMany('Comment', { through: 'posts' })
  public comments: Comment[]

  @SnapshotableFollowThrough()
  @Deco.HasMany('Comment', { through: 'posts', source: 'comments' })
  public commentsFollowingThrough: Comment[]

  @Deco.HasOne('Post')
  public mostRecentPost: Post | null
}
