import { DreamColumn } from '@rvohealth/dream';
import UserSerializer, { UserSummarySerializer } from '../../app/serializers/UserSerializer';
import ApplicationModel from './ApplicationModel';
import Post from './Post';
declare const User_base: {
    new (...args: any[]): {
        [x: string]: any;
        takeSnapshot(): Promise<Record<string, any>>;
        _takeSnapshot(dream: import("@rvohealth/dream").Dream): Promise<Record<string, any>>;
    };
} & typeof ApplicationModel;
export default class User extends User_base {
    get table(): "users";
    get serializers(): {
        readonly default: {
            new (data: any): UserSerializer<any, any>;
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
            new (data: any): UserSummarySerializer<any, any>;
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
    id: DreamColumn<User, 'id'>;
    email: DreamColumn<User, 'email'>;
    name: DreamColumn<User, 'name'>;
    createdAt: DreamColumn<User, 'createdAt'>;
    updatedAt: DreamColumn<User, 'updatedAt'>;
    loginCount: DreamColumn<User, 'loginCount'>;
    posts: Post[];
    mostRecentPost: Post | null;
}
export {};
