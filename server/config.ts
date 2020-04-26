import dotenv from 'dotenv';
dotenv.config();

interface Keys {
    aws_secret_key: string,
    aws_access_key: string,
    aws_region: string,
    google_maps_api_key: string,
    aws_dynamo_table_name: string
};

const keys: Keys = {
    aws_access_key: process.env.aws_access_key!,
    aws_secret_key: process.env.aws_secret_key!,
    aws_region: process.env.aws_region!,
    google_maps_api_key: process.env.google_map_api_key!,
    aws_dynamo_table_name: process.env.aws_dynamo_table_name!,
};

export default keys;