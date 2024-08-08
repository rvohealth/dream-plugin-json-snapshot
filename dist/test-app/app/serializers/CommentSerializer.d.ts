import { DreamSerializer, DreamColumn } from '@rvohealth/dream';
import Comment from '../models/Comment';
import Post from '../models/Post';
export declare class CommentSummarySerializer<DataType extends Comment, Passthrough extends object> extends DreamSerializer<DataType, Passthrough> {
    id: DreamColumn<Comment, 'id'>;
}
export default class CommentSerializer<DataType extends Comment, Passthrough extends object> extends CommentSummarySerializer<DataType, Passthrough> {
    post: Post;
    body: DreamColumn<Comment, 'body'>;
    numLikes: DreamColumn<Comment, 'numLikes'>;
}
