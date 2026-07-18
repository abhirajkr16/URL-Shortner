//notes: Function-based Architecture

import redisClient from "../config/redis.js";

export const getCache = async (key) => {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
};

export const setCache = async (key, value, ttlInSeconds) => {
    await redisClient.set(
        key,
        JSON.stringify(value),
        {
            EX: ttlInSeconds,
        }
    );
};

export const deleteCache = async (key) => {
    await redisClient.del(key);
};

// notes: class-based architecture,

// import redisClient from "../config/redis.js";

// class RedisService {
//     async get(key) {
//         return await redisClient.get(key);
//     }

//     async set(key, value, ttlInSeconds) {
//         return await redisClient.set(key, value, { EX: ttlInSeconds, });
//     }

//     async del(key) {
//         return await redisClient.del(key);
//     }
// }