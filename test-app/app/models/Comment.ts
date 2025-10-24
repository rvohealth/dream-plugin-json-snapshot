import { Decorators } from '@rvoh/dream'
import { DreamColumn } from '@rvoh/dream/types'
import ApplicationModel from './ApplicationModel.js'
import Post from './Post.js'
import User from './User.js'

const Deco = new Decorators<typeof Comment>()

export default class Comment extends ApplicationModel {
  public override get table() {
    return 'comments' as const
  }

  public id: DreamColumn<Comment, 'id'>
  public body: DreamColumn<Comment, 'body'>
  public numLikes: DreamColumn<Comment, 'numLikes'>
  public createdAt: DreamColumn<Comment, 'createdAt'>
  public updatedAt: DreamColumn<Comment, 'updatedAt'>

  @Deco.BelongsTo('Post')
  public post: Post
  public postId: DreamColumn<Comment, 'postId'>

  @Deco.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Comment, 'userId'>
}
