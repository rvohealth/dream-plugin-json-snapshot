import { DreamSerializer, Attribute, DreamColumn, RendersOne } from '@rvoh/dream'
import Comment from '../models/Comment'
import Post from '../models/Post'

export class CommentSummarySerializer<
  DataType extends Comment,
  Passthrough extends object,
> extends DreamSerializer<DataType, Passthrough> {
  @Attribute('string')
  public id: DreamColumn<Comment, 'id'>
}

export default class CommentSerializer<
  DataType extends Comment,
  Passthrough extends object,
> extends CommentSummarySerializer<DataType, Passthrough> {
  @RendersOne()
  public post: Post

  @Attribute('string')
  public body: DreamColumn<Comment, 'body'>

  @Attribute('number')
  public numLikes: DreamColumn<Comment, 'numLikes'>
}
