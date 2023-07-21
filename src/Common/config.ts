import dotenv from 'dotenv';
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_HOST = process.env.MONGO_HOST || '';

const JWT_SECRET = process.env.JWT_SECRET || '';

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const REDIS_PORT = process.env.REDIS_PORT || '';

const NODE_ENV = process.env.NODE_ENV;

const MONGO = {
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER = {
    port: SERVER_PORT
};

const JWT = {
    secret: JWT_SECRET
};

const REDIS = {
    port: REDIS_PORT
};

const NODE = {
    env: NODE_ENV
};

const config = {
    mongo: MONGO,
    server: SERVER,
    jwt: JWT,
    node: NODE,
    redis: REDIS
};

export default config;
