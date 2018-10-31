const RedisService = require('./01_redisService');
const ErrorReporting = require('./02_errorReporting');
const LoggingService = require('./03_loggingService');

const getRedisService = (context, errMsg, rollbarReport, options, newClient = false) => {
    const service = new RedisService(context, options, newClient);

    return {
        connect() {
            return service.connectToRedis(errMsg, rollbarReport);
        },
        disconnect() {
            return service.disconnectRedis();
        }
    };
};

const errReporter = new ErrorReporting();
const getErrorReporter = () => errReporter;

const logger = new LoggingService();
const getLogger = () => logger.getLogger();

module.exports = {
    getRedisService,
    getErrorReporter,
    getLogger
};