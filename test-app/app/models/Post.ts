import { Decorators, DreamColumn } from '@rvoh/dream'
import Snapshotable from '../../../src/Snapshotable'
import SnapshotableIgnore from '../../../src/SnapshotableIgnore'
import ApplicationModel from './ApplicationModel'
import Comment from './Comment'
import User from './User'

const Deco = new Decorators<InstanceType<typeof Post>>()

export default class Post extends Snapshotable(ApplicationModel) {
  public get table() {
    return 'posts' as const
  }

  public id: DreamColumn<Post, 'id'>
  public body: DreamColumn<Post, 'body'>
  public title: DreamColumn<Post, 'title'>
  public subtitle: DreamColumn<Post, 'subtitle'>
  public createdAt: DreamColumn<Post, 'createdAt'>
  public updatedAt: DreamColumn<Post, 'updatedAt'>

  @Deco.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Post, 'userId'>

  @Deco.HasMany('Comment')
  public comments: Comment[]

  @SnapshotableIgnore()
  @Deco.HasMany('Comment', { on: { body: null } })
  public nullComments: Comment[]

  @Deco.HasOne('Comment')
  public mostRecentComment: Comment | null

  @SnapshotableIgnore()
  @Deco.HasOne('Comment', { on: { body: null } })
  public mostRecentNullComment: Comment[]
}
