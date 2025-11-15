import { Decorators, DreamConst } from '@rvoh/dream'
import { DreamColumn } from '@rvoh/dream/types'
import Snapshotable from '../../../src/Snapshotable.js'
import SnapshotableFollowThrough from '../../../src/SnapshotableFollowThrough.js'
import SnapshotableIgnore from '../../../src/SnapshotableIgnore.js'
import ApplicationModel from './ApplicationModel.js'
import Comment from './Comment.js'
import Post from './Post.js'

const Deco = new Decorators<typeof User>()

export default class User extends Snapshotable(ApplicationModel) {
  public override get table() {
    return 'users' as const
  }

  public id: DreamColumn<User, 'id'>
  public email: DreamColumn<User, 'email'>
  public name: DreamColumn<User, 'name'>
  public createdAt: DreamColumn<User, 'createdAt'>
  public updatedAt: DreamColumn<User, 'updatedAt'>

  @SnapshotableIgnore()
  public loginCount: DreamColumn<User, 'loginCount'>

  @Deco.HasMany('Post')
  public posts: Post[]

  @Deco.HasMany('Post', { and: { title: DreamConst.required } })
  public postsWithRequiredOnClause: Post[]

  @Deco.HasMany('Post', { and: { title: DreamConst.passthrough } })
  public postsWithPassthroughOnClause: Post[]

  @Deco.HasMany('Comment', { through: 'posts' })
  public comments: Comment[]

  @SnapshotableFollowThrough()
  @Deco.HasMany('Comment', { through: 'posts', source: 'comments' })
  public commentsFollowingThrough: Comment[]

  @Deco.HasOne('Post')
  public mostRecentPost: Post | null
}
