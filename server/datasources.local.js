module.exports = {
    mongo: {
        url: process.env.MONGODB,
        name: 'mongo',
        connector: 'mongodb',
        connectionTimeout: 200000,
        allowExtendedOperators: true,
        strictObjectIDCoercion: true,
        socketTimeoutMS: 300000,
    },
    redis: {
        host: process.env.REDIS_SERVER,
        port: process.env.REDIS_PORT,
        name: 'redis',
        connector: 'kv-redis'
    },
    memorydb: {
        name: 'memorydb',
        connector: 'memory',
    }
};