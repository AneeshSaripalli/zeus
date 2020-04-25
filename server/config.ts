import dotenv from 'dotenv';
dotenv.config();

interface Keys {
    aws_secret_key: string,
    aws_access_key: string,
    aws_region: string
};

const keys: Keys = {
    aws_access_key: process.env.aws_access_key!,
    aws_secret_key: process.env.aws_secret_key!,
    aws_region: process.env.aws_region!,
};

export default keys;