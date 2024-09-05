import { DreamColumn } from '@rvohealth/dream'
import HideFromSnapshotable from '../../../src/hide-from-snapshots'
import Snapshotable from '../../../src/snapshotable'
import ApplicationModel from './ApplicationModel'
import Comment from './Comment'
import User from './User'

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

  @Post.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Post, 'userId'>

  @Post.HasMany('Comment')
  public comments: Comment[]

  @HideFromSnapshotable()
  @Post.HasMany('Comment', { where: { body: null } })
  public nullComments: Comment[]

  @Post.HasOne('Comment', { order: { id: 'desc' } })
  public mostRecentComment: Comment | null

  @HideFromSnapshotable()
  @Post.HasOne('Comment', { where: { body: null } })
  public mostRecentNullComment: Comment[]
}
