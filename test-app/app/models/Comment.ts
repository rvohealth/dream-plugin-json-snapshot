import { BelongsTo, DreamColumn } from '@rvohealth/dream'
import CommentSerializer, {
  CommentSummarySerializer,
} from '../../../test-app/app/serializers/CommentSerializer'
import ApplicationModel from './ApplicationModel'
import Post from './Post'
import User from './User'

export default class Comment extends ApplicationModel {
  public get table() {
    return 'comments' as const
  }

  public get serializers() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default: CommentSerializer<any, any>,

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      summary: CommentSummarySerializer<any, any>,
    } as const
  }

  public id: DreamColumn<Comment, 'id'>
  public body: DreamColumn<Comment, 'body'>
  public numLikes: DreamColumn<Comment, 'numLikes'>
  public createdAt: DreamColumn<Comment, 'createdAt'>
  public updatedAt: DreamColumn<Comment, 'updatedAt'>

  @BelongsTo(() => Post)
  public post: Post
  public postId: DreamColumn<Comment, 'postId'>

  @BelongsTo(() => User)
  public user: User
  public userId: DreamColumn<Comment, 'userId'>
}
