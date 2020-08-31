import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const result = dotenv.config();

if (!result) {
    throw new Error('⚠️  Could not find .env file  ⚠️');
}

const env = process.env;

export default {
    port: env.PORT,
    db_name: env.DB_NAME,
    db_url: env.DB_URL
};
