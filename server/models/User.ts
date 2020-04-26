import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';
import keys from '../config';
import { Utility } from '../types/Utilities';



@table(keys.aws_dynamo_table_name)
class User {
    @hashKey()
    id!: string;

    @attribute()
    lat!: number;

    @attribute()
    lng!: number;

    @attribute()
    address!: string;

    @attribute()
    consumption!: [Utility, number][]

    @attribute()
    zip!: string;
}

export default User;