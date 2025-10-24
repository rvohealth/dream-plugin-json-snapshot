import { Decorators, SoftDelete } from '@rvoh/dream'
import { DreamColumn } from '@rvoh/dream/types'
import Snapshotable from '../../../src/Snapshotable.js'
import SnapshotableIgnore from '../../../src/SnapshotableIgnore.js'
import ApplicationModel from './ApplicationModel.js'
import Comment from './Comment.js'
import User from './User.js'

const Deco = new Decorators<typeof Post>()

@SoftDelete()
export default class Post extends Snapshotable(ApplicationModel) {
  public override get table() {
    return 'posts' as const
  }

  public id: DreamColumn<Post, 'id'>
  public body: DreamColumn<Post, 'body'>
  public title: DreamColumn<Post, 'title'>
  public subtitle: DreamColumn<Post, 'subtitle'>
  public deletedAt: DreamColumn<Post, 'deletedAt'>
  public createdAt: DreamColumn<Post, 'createdAt'>
  public updatedAt: DreamColumn<Post, 'updatedAt'>

  @Deco.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Post, 'userId'>

  @Deco.HasMany('Comment')
  public comments: Comment[]

  @SnapshotableIgnore()
  @Deco.HasMany('Comment', { and: { body: null } })
  public nullComments: Comment[]

  @Deco.HasOne('Comment')
  public mostRecentComment: Comment | null

  @SnapshotableIgnore()
  @Deco.HasOne('Comment', { and: { body: null } })
  public mostRecentNullComment: Comment[]
}
