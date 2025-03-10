import { Decorators, DreamColumn } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import Post from './Post'
import User from './User'

const Deco = new Decorators<InstanceType<typeof Comment>>()

export default class Comment extends ApplicationModel {
  public get table() {
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
