require('@google-cloud/trace-agent').start({
    // samplingRate: 500,
    // ignoreUrls: [/^\/ignore-me#/]
});

const loopback = require('loopback');
const boot = require('loopback-boot');

const { ErrorReporting } = require('@google-cloud/error-reporting');


const app = loopback();
module.exports = app;

app.get('/vitals/docker', (req, res) => {
    // Ensure Process is responding
    res.send('ok');
});

// Needs to be the last middleware attached
const errors = new ErrorReporting();
app.use(errors.express);

app.start = function startServer() {
    return app.listen(() => {
        app.emit('started');
        const baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            const explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    });
};

app.set('port', process.env.PORT || 3003);

boot(app, __dirname, (err) => {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module) { app.start(); }
});