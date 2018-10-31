const path = require('path');

const { ErrorReporting } = require('@google-cloud/error-reporting');

class StackDriverService {
    constructor() {
        this.isProduction = process.env.NODE_ENV === 'production';

        const pathToFile = path.join(__dirname, '../../credentials/master-deck-829-4cefd24e87dc.json');

        if (this.isProduction) {
            this.errorReporter = new ErrorReporting({
                reportUnhandledRejections: this.isProduction,
                ignoreEnvironmentCheck: true,
                serviceContext: {
                    service: process.env.SERVICE_NAME || 'api',
                },
            });
        } else {
            this.errorReporter = new ErrorReporting({
                reportUnhandledRejections: this.isProduction,
                ignoreEnvironmentCheck: true,
                serviceContext: {
                    service: process.env.SERVICE_NAME || 'api',
                },
                projectId: 'master-deck-829',
                keyFilename: pathToFile,
            });
        }
    }

    async report(err) {
        return new Promise(async(resolve, reject) => {
            if (!this.isProduction) {
                return resolve(false);
            }
            this.errorReporter.report(err, (e) => {
                // if (e) {
                //     return reject(e);
                // }
                resolve(true);
            });
        });
    }
}

module.exports = StackDriverService;