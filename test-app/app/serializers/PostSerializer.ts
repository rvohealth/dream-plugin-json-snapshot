import { DreamSerializer, Attribute, DreamColumn, RendersOne } from '@rvohealth/dream'
import Post from '../models/Post'
import User from '../models/User'

export class PostSummarySerializer<DataType extends Post, Passthrough extends object> extends DreamSerializer<
  DataType,
  Passthrough
> {
  @Attribute('string')
  public id: DreamColumn<Post, 'id'>
}

export default class PostSerializer<
  DataType extends Post,
  Passthrough extends object,
> extends PostSummarySerializer<DataType, Passthrough> {
  @RendersOne()
  public user: User

  @Attribute('string')
  public body: DreamColumn<Post, 'body'>

  @Attribute('string')
  public title: DreamColumn<Post, 'title'>

  @Attribute('string')
  public subtitle: DreamColumn<Post, 'subtitle'>
}
