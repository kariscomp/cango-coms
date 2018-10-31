const env = (process.env.NODE_ENV || 'development');
const isDevEnv = env === 'development' || env === 'test';

const p = require('../package.json');

const version = p.version.split('.').shift();

module.exports = {
    restApiRoot: '/api' + (version > 0 ? '/v' + version : ''),
    livereload: true,
    isDevEnv,
    indexFile: require.resolve('../client/index.html'),
    port: process.env.PORT || 30003,
};