const net = require('net');
const port = 9001;
const host = '0.0.0.0';
const stratum = net.createServer();
const mockData = require('./mock.data.js')

stratum.on('connection', async (socket) => {
    socket.on('data', async (data) => {
        const raw = JSON.parse(data.toString());
        let msg = {};

        if (raw.method == 'login') { msg = mockData.login; }
        if (raw.method == 'submit') {
            msg = mockData.submit; console.dir(raw)
        }
        if (raw.method == 'keepalived') { msg = mockData.keepalived; }
        msg.id = raw.id;
        return socket.write(JSON.stringify(msg) + "\n");
    })


})

async function main() {
    await stratum.listen(port, host, () => {
        console.log(`Stratum/Emerald mock server running on port ${port}`)
    })
    return 1;

}


main().then(() => {
    console.log('Ready!');
}).catch(err => {
    console.dir(err);
    process.exit(1)
})