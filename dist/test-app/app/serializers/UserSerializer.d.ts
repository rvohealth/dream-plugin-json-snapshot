import { DreamSerializer, DreamColumn } from '@rvohealth/dream';
import User from '../models/User';
export declare class UserSummarySerializer<DataType extends User, Passthrough extends object> extends DreamSerializer<DataType, Passthrough> {
    id: DreamColumn<User, 'id'>;
}
export default class UserSerializer<DataType extends User, Passthrough extends object> extends UserSummarySerializer<DataType, Passthrough> {
    email: DreamColumn<User, 'email'>;
    name: DreamColumn<User, 'name'>;
    loginCount: DreamColumn<User, 'loginCount'>;
}
