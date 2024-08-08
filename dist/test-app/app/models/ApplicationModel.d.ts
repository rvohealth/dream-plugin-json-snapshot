import { Dream, Dreamconf } from '@rvohealth/dream';
import { DBClass } from '../../db/sync';
import { globalSchema, schema } from '../../db/schema';
export default class ApplicationModel extends Dream {
    get dreamconf(): Dreamconf<DBClass, typeof schema, typeof globalSchema>;
}
