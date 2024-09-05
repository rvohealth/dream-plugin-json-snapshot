import { DreamColumn } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import Post from './Post'
import User from './User'

export default class Comment extends ApplicationModel {
  public get table() {
    return 'comments' as const
  }

  public id: DreamColumn<Comment, 'id'>
  public body: DreamColumn<Comment, 'body'>
  public numLikes: DreamColumn<Comment, 'numLikes'>
  public createdAt: DreamColumn<Comment, 'createdAt'>
  public updatedAt: DreamColumn<Comment, 'updatedAt'>

  @Comment.BelongsTo('Post')
  public post: Post
  public postId: DreamColumn<Comment, 'postId'>

  @Comment.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Comment, 'userId'>
}
