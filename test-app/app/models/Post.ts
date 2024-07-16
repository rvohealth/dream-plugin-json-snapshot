import { BelongsTo, DreamColumn, HasMany, HasOne } from '@rvohealth/dream'
import PostSerializer, { PostSummarySerializer } from '../../../test-app/app/serializers/PostSerializer'
import ApplicationModel from './ApplicationModel'
import Comment from './Comment'
import User from './User'
import Snapshotable from '../../../src/snapshotable'
import HideFromSnapshotable from '../../../src/hide-from-snapshots'

export default class Post extends Snapshotable(ApplicationModel) {
  public get table() {
    return 'posts' as const
  }

  public get serializers() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default: PostSerializer<any, any>,

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      summary: PostSummarySerializer<any, any>,
    } as const
  }

  public id: DreamColumn<Post, 'id'>
  public body: DreamColumn<Post, 'body'>
  public title: DreamColumn<Post, 'title'>
  public subtitle: DreamColumn<Post, 'subtitle'>
  public createdAt: DreamColumn<Post, 'createdAt'>
  public updatedAt: DreamColumn<Post, 'updatedAt'>

  @BelongsTo(() => User)
  public user: User
  public userId: DreamColumn<Post, 'userId'>

  @HasMany(() => Comment)
  public comments: Comment[]

  @HideFromSnapshotable()
  @HasMany(() => Comment, { where: { body: null } })
  public nullComments: Comment[]

  @HasOne(() => Comment, { order: { id: 'desc' } })
  public mostRecentComment: Comment | null

  @HideFromSnapshotable()
  @HasOne(() => Comment, { where: { body: null } })
  public mostRecentNullComment: Comment[]
}
