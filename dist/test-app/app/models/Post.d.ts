import { DreamColumn } from '@rvohealth/dream';
import PostSerializer, { PostSummarySerializer } from '../../../test-app/app/serializers/PostSerializer';
import ApplicationModel from './ApplicationModel';
import Comment from './Comment';
import User from './User';
declare const Post_base: {
    new (...args: any[]): {
        [x: string]: any;
        takeSnapshot(): Promise<Record<string, any>>;
        _takeSnapshot(dream: import("@rvohealth/dream").Dream): Promise<Record<string, any>>;
    };
} & typeof ApplicationModel;
export default class Post extends Post_base {
    get table(): "posts";
    get serializers(): {
        readonly default: {
            new (data: any): PostSerializer<any, any>;
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
            new (data: any): PostSummarySerializer<any, any>;
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
    id: DreamColumn<Post, 'id'>;
    body: DreamColumn<Post, 'body'>;
    title: DreamColumn<Post, 'title'>;
    subtitle: DreamColumn<Post, 'subtitle'>;
    createdAt: DreamColumn<Post, 'createdAt'>;
    updatedAt: DreamColumn<Post, 'updatedAt'>;
    user: User;
    userId: DreamColumn<Post, 'userId'>;
    comments: Comment[];
    nullComments: Comment[];
    mostRecentComment: Comment | null;
    mostRecentNullComment: Comment[];
}
export {};
