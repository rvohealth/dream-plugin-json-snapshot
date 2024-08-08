import { DreamSerializer, DreamColumn } from '@rvohealth/dream';
import Post from '../models/Post';
import User from '../models/User';
export declare class PostSummarySerializer<DataType extends Post, Passthrough extends object> extends DreamSerializer<DataType, Passthrough> {
    id: DreamColumn<Post, 'id'>;
}
export default class PostSerializer<DataType extends Post, Passthrough extends object> extends PostSummarySerializer<DataType, Passthrough> {
    user: User;
    body: DreamColumn<Post, 'body'>;
    title: DreamColumn<Post, 'title'>;
    subtitle: DreamColumn<Post, 'subtitle'>;
}
