const redis = require('redis');

const redisServer = process.env.REDIS_SERVER;
const redisPass = process.env.REDIS_PASS;
const redisPort = process.env.REDIS_PORT;

// Refactor this with Promises

class RedisService {
    constructor(context = 'DEFAULT', options, newClient = false) {
        const redisOptions = Object.assign({}, options);

        this.context = context;
        this.newClient = newClient;
        if (!newClient) {
            if (!global.shareableRedisClient) {
                this.redisClient = redis.createClient(redisPort, redisServer, redisOptions);
                this.watchErrors();
            }
        } else {
            this.redisClient = redis.createClient(redisPort, redisServer, redisOptions);
            this.watchErrors();
        }
    }

    connectToRedis(onErrorMsg = `${this.context} connect context`, rollbarReport) {
        if (!this.newClient) {
            if (global.shareableRedisClient) {
                return global.shareableRedisClient;
            }
        }

        this.redisClient.auth(redisPass, (err) => {
            if (err) {
                if (rollbarReport) {
                    global.rollbar.handleError(err);
                }
                console.log(onErrorMsg, err, redisPass);
            }
            console.log('Redis Authenticated! ');
        });
        if (!this.newClient) {
            global.shareableRedisClient = this.redisClient;
            return global.shareableRedisClient;
        }
        return this.redisClient;
    }

    disconnectRedis() {
        this.redisClient.quit();
        // global.shareableRedisClient.quit();
    }

    watchErrors() {
        this.redisClient.on('error', (err) => {
            const quietMessages = ['UNCERTAIN_STATE', 'ETIMEDOUT'];
            if (quietMessages.includes(err.code)) {
                return;
            }
            console.error(`${this.context} - Redis Error: `, err);
        });
    }
}

module.exports = RedisService;