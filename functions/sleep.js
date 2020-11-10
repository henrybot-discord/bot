
module.exports = (client) => {
    client.sleep = (ms) => new Promise(resolve => client.setTimeout(resolve, ms));
    client.delay = client.sleep;
    client.wait = client.sleep;
    client.pause = client.sleep;
}