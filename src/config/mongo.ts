import mongoose from 'mongoose';
import env from './environment';

const MONGO_CONFIG = { useNewUrlParser: true, useUnifiedTopology: true };
const MONGO_URL = `${env.db_url}/${env.db_name}`;

const connectToMongoDb = () => mongoose.connect(MONGO_URL, MONGO_CONFIG);

export default connectToMongoDb