const { expect } = require('../support/expect');
const BunyanService = require('../../common/services/03_loggingService');
const StackDriverService = require('../../common/services/02_errorReporting');

const { getLogger, getErrorReporter, getRedisService } = require('../../common/services/servicesManager');

describe('Services (Unit)', async() => {
    describe('Logging Service (Unit)', async() => {
        it('should return a valid logger', async() => {
            const newBunyan = new BunyanService();
            const log = newBunyan.getLogger();
            expect(log).to.be.an('object');
            expect(log.info).to.be.a('function');
            expect(log.error).to.be.a('function');
            expect(log.fatal).to.be.a('function');
            expect(log.warn).to.be.a('function');
            expect(log.trace).to.be.a('function');
        });
        it('should return a valid logger for production', async() => {
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'production';
            const newBunyan = new BunyanService();
            const log = newBunyan.getLogger();
            expect(log).to.be.an('object');
            expect(log.info).to.be.a('function');
            expect(log.error).to.be.a('function');
            expect(log.fatal).to.be.a('function');
            expect(log.warn).to.be.a('function');
            expect(log.trace).to.be.a('function');
            process.env.NODE_ENV = originalEnv;
        });
    });
    describe('Error Reporting Service (Unit) ', async() => {
        const sdriver = new StackDriverService();
        it('should return a valid error handler', async() => {
            expect(sdriver.errorReporter).to.be.an('object');
            expect(sdriver.errorReporter.report).to.be.an('function');
            expect(sdriver.report).to.be.a('function');
            expect(sdriver.errorReporter.express).to.be.ok();
        });

        it('should handle an error', async() => {
            const newError = new Error('Test Error');
            const reported = await sdriver.report(newError).catch((e) => {
                expect(e).to.be.undefined();
            });
            if (process.env.NODE_ENV === 'production') {
                expect(reported).to.be.ok();
            } else {
                expect(reported).to.be.false();
            }
        });
    });
    describe('Redis Service (Unit)', async() => {});
    describe('Services Manager (Unit)', async() => {
        it('should export correct service functions', async() => {
            const log = getLogger();
            expect(log.info).to.be.a('function');

            const errRpt = getErrorReporter();
            expect(errRpt.report).to.be.a('function');

            const redisCientGetter = getRedisService();
            expect(redisCientGetter.connect).to.be.a('function');
            const redisClient = redisCientGetter.connect();
            expect(redisClient.get).to.be.a('function');
            expect(redisClient.get).to.be.a('function');
            expect(redisClient.ping).to.be.a('function');
        });
    });
});