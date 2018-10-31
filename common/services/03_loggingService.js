const bunyan = require('bunyan');
const { LoggingBunyan } = require('@google-cloud/logging-bunyan');

class BunyanService {
    constructor() {
        if (process.env.NODE_ENV === 'production') {
            const loggingBunyan = new LoggingBunyan();
            this.logger = bunyan.createLogger({
                name: process.env.SERVICE_NAME || 'supply-service',
                streams: [
                    { stream: process.stdout, level: 'info' },
                    // And log to Stackdriver Logging, logging at 'info' and above
                    loggingBunyan.stream('info'),
                ],
            });
        } else {
            this.logger = bunyan.createLogger({
                name: 'supply-service',
                stream: process.stdout,
                level: 'info'
            });
        }
    }

    getLogger() {
        return this.logger;
    }
}

module.exports = BunyanService;