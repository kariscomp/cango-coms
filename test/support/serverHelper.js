const request = require('supertest');

const app = process.env.wallabyTest ? 'https://api-243-heavy.safemotos.com' : require('../../server/server');
// app = require('../server/server');
const theServer = (verb, url) => {
    request(app)[verb](url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
};

module.exports = theServer;