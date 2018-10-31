/*
 *********
 ********* This is configuration file for Wallaby.js.
 ********* If you want to use the Wallaby.js go check out https://wallabyjs.com/
 */
const fs = require('fs');

const nodePath = '/usr/local/n/versions/node/10.10.0/bin/node';
const nodeLocal = fs.existsSync(nodePath) ? nodePath : 'node';

module.exports = (wallaby) => {
    process.env.wallabyTest = true;
    return {
        files: [
            'server/**/*.*',
            'common/**/*.*',
            'test/fixtures/*.*',
            'test/support/expect.js',
            'test/support/serverHelper.js',
            'package.json',
            'client/**/*.*',
            'credentials/**',
            'test/support/env.js'
        ],
        tests: [
            'test/acceptance/**/*.js',
            'test/integration/**/*.js',
            'test/unit/*.js',
        ],
        env: {
            type: 'node',
            runner: nodeLocal
        },
        lowCoverageThreshold: 80,
        name: 'supply-service',
        testFramework: 'mocha',
        reportUnhandledPromises: false,
        debug: true,
        setup() {
            process.env.WALLABY = true;
            process.env.NODE_ENV = 'development';
        },
        // workers: { initial: 1, regular: 1 }
    };
};