import { DataMapper } from '@aws/dynamodb-data-mapper';
import AWS from 'aws-sdk';
import keys from '../config';

AWS.config.update({
    region: keys.aws_region,
    accessKeyId: keys.aws_access_key,
    secretAccessKey: keys.aws_secret_key,
});

const ddb: AWS.DynamoDB = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const DynamoMapper = new DataMapper({
    client: ddb
});

export default DynamoMapper;