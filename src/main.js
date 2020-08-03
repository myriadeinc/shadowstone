const path = require('path');
const rootPath = path.resolve(`${__dirname}/..`);
require('app-module-path').addPath(rootPath);
const config = require('./config.js')
const logger = require('src/logger.js')
const express = require('express');
const app = express();
const net = require('net');

const host = '0.0.0.0';
const proxyPort = config.get("proxy:port") || 12345;
const commandPort = config.get("command:port") || 9990
let debugMode = true;
// Proxy
const proxyServer = net.createServer();
// Command Server
const rpc_client = require('json-rpc-client');

const errorMessage =
    `
    {
      "id": 1,
      "jsonrpc": "2.0",
      "error": {
        "code": -1,
        "message": "Invalid data provided"
      }
    } \n`;

// Use a simple client here, no need for anything verbose yet
var c = new rpc_client({
    port: 22345,
    host: 'emerald'
})
// We store all socket connections in memory, in case it blows up we can spawn more instances on more ports
let sockets = [];
async function jobRefresh() {
    return sockets.map(async (socket) => {
        console.log(`Sending info for ${socket.minerId}`);
        const minerId = socket.minerId;
        try {
            const jobData = await c.send('login', {
                "login": minerId,
            })
            const job = {
                jsonrpc: "2.0",
                method: "job",
                params: jobData.result.job
            }
            socket.write(JSON.stringify(job) + "\n" + "\n")
        }
        catch (err) {
            console.dir(err)
        }
    })
}
app.get("/refresh", async (req, res) => {
    await jobRefresh();
    logger.command.info('Sent refresh job');
    return res.status(200).send('OK');
})
app.get("/hc", async (req, res) => {
    logger.command.info('Healthcheck!');
    return res.status(200).send('OK');
})
proxyServer.on('connection', async (socket) => {
    socket.setEncoding('utf8')
    socket.setKeepAlive(true)
    // I hate this method but we need to properly filter raw tcp messages
    socket.on('data', async (data) => {
        // Remove literal newlines with actual 
        const regex = /[\n]+/g
        // 100KB limit
        if (Buffer.byteLength(data) > 102400) {
            logger.core.info("Data overflow!")
            return socket.destroy();
        }

        // Split by newlines
        let messages = data.toString().replace(regex, '\n').split('\n');
        // In case of multiple JSON messages sent, we will have to fold into array
        if (debugMode) {
            logger.core.info(`Data on : ${socket.remoteAddress}`)
        }
        messages.map(async message => {
            if (message == '') {
                // Skip blanks
                return;
            }
            console.log('====================== INCOMING MESSAGE')
            console.dir(message)
            try {
                // If we can't parse, fail immediately
                const raw = JSON.parse(message)
                if (raw.method == 'login') {
                    socket.minerId = raw.params.login;
                    sockets.push(socket);
                }
                let reply = {}
                switch (raw.method) {
                    case 'login':
                        reply = await c.send(raw.method, raw.params);
                        break;
                    case 'submit':
                        reply = await c.send(raw.method, raw.params);
                        break;
                    case 'keepalived':
                        reply = await c.send(raw.method, raw.params);
                        break;
                    default:
                        reply = { error: 'Client error: no specified method call' }
                }
                reply.id = raw.id;
                logger.core.info(`Sending reply:`)
                console.dir(reply)
                // Newline is required!
                socket.write(JSON.stringify(reply) + "\n")
            }
            catch (err) {
                logger.core.info(err)
                logger.core.info(message)
                socket.write(errorMessage)
            }
        })


    })
    socket.on('error', () => {
        logger.core.info('Disconnecting user due to error!')
        // Yes, this is bad since it is essentially O(n) time
        // sockets = sockets.filter(s => s == socket)
    })
    socket.on('close', () => {
        logger.core.info('Disconnecting user due to close!')
        // Yes, this is bad since it is essentially O(n) time
        // sockets = sockets.filter(s => s == socket)
    })
    socket.on('end', () => {
        logger.core.info('Disconnecting user due to end event!')
        // Yes, this is bad since it is essentially O(n) time
        // sockets = sockets.filter(s => s == socket)
    })

});

async function main() {
    proxyServer.listen(proxyPort, host, () => {
        logger.core.info(`TCP Proxy Server running on port ${proxyPort}`)
    })
    app.listen(commandPort, () => {
        logger.core.info(`Command Server listening on port ${commandPort}`)
    })
    await c.connect();
}

main().then(() => {
    logger.core.info('Shadowstone Running!');
}).catch(err => {
    console.log(err);
    process.exit(1);
})