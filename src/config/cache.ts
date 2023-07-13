const redis = require('redis');
import { promisify } from 'util';
import config from './config';

const client = redis.createClient(config.redis.port);

function getRedis(value: string) {
    const syncRedisGet = promisify(client.get).bind(client);
    return syncRedisGet(value);

    // redisClient.get("")
}

function setRedis(key: string, value: string) {
    const syncRedisSet = promisify(client.set).bind(client);
    return syncRedisSet(key, value);

    // redisClient.set("", "")
}

export { client, getRedis, setRedis };
