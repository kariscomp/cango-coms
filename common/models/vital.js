const Promise = require('bluebird');
const app = require('../../server/server');

const checkVital = async(ds) => {
    ds.ping((err) => {
        if (err) {
            throw err;
        }
        return { status: 'healthy' };
    });
};

module.exports = (Vital) => {
    Vital.check = async function checkVitals() {
        const status = {
            status: 'healthy',
            dependencies: {},
        };
        const dsList = app.dataSources;
        const dsNames = Object.keys(dsList);
        dsNames.forEach((dsName) => {
            status.dependencies[dsName] = checkVital(dsList[dsName]);
        });
        status.dependencies = await Promise.props(status.dependencies);
        return status;
    };
};