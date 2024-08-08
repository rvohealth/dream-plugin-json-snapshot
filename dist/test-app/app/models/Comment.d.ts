import { DreamColumn } from '@rvohealth/dream';
import CommentSerializer, { CommentSummarySerializer } from '../../../test-app/app/serializers/CommentSerializer';
import ApplicationModel from './ApplicationModel';
import Post from './Post';
import User from './User';
export default class Comment extends ApplicationModel {
    get table(): "comments";
    get serializers(): {
        readonly default: {
            new (data: any): CommentSerializer<any, any>;
            attributeStatements: import("@rvohealth/dream/src/serializer/decorators/attribute").AttributeStatement[];
            associationStatements: import("@rvohealth/dream/src/serializer/decorators/associations/shared").AssociationStatement[];
            readonly isDreamSerializer: true;
            render(data: any, opts?: import("@rvohealth/dream/src/serializer").DreamSerializerStaticRenderOpts): {
                [key: string]: any;
            };
            renderArray(dataArr: any[], opts?: import("@rvohealth/dream/src/serializer").DreamSerializerStaticRenderOpts): {
                [key: string]: any;
            }[];
        };
        readonly summary: {
            new (data: any): CommentSummarySerializer<any, any>;
            attributeStatements: import("@rvohealth/dream/src/serializer/decorators/attribute").AttributeStatement[];
            associationStatements: import("@rvohealth/dream/src/serializer/decorators/associations/shared").AssociationStatement[];
            readonly isDreamSerializer: true;
            render(data: any, opts?: import("@rvohealth/dream/src/serializer").DreamSerializerStaticRenderOpts): {
                [key: string]: any;
            };
            renderArray(dataArr: any[], opts?: import("@rvohealth/dream/src/serializer").DreamSerializerStaticRenderOpts): {
                [key: string]: any;
            }[];
        };
    };
    id: DreamColumn<Comment, 'id'>;
    body: DreamColumn<Comment, 'body'>;
    numLikes: DreamColumn<Comment, 'numLikes'>;
    createdAt: DreamColumn<Comment, 'createdAt'>;
    updatedAt: DreamColumn<Comment, 'updatedAt'>;
    post: Post;
    postId: DreamColumn<Comment, 'postId'>;
    user: User;
    userId: DreamColumn<Comment, 'userId'>;
}
