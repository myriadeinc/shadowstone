'use strict';
const bunyan = require('bunyan')
    , bformat = require('bunyan-formatter')
    , formatOut = bformat({ outputMode: 'short', level: 'debug' });

const config = require('src/config.js');

// let LogDNAStream = require('logdna-bunyan').BunyanStream;

let streams = [];
streams.push({ stream: formatOut });
// if (config.get('log:logdna_api_token')) {
//     streams.push({
//         stream: new LogDNAStream({
//             key: config.get('log:logdna_api_token')
//         }),
//         type: 'raw'
//     })
// }

const logger = bunyan.createLogger({
    name: 'shadowstone',
    streams
});

module.exports = {
    core: logger.child({ component: 'core' }),
    // For command server
    command: logger.child({ component: 'command' }),
    // For proxy server
    proxy: logger.child({ component: 'proxy' })


};