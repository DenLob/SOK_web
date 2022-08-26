require('dotenv').config()
const util = require("util");
const amqplib = require('amqplib');


const amqp_url = {
        protocol: process.env.RABBITMQ_PROTOCOL,
        hostname: process.env.RABBITMQ_HOSTNAME,
        port: process.env.RABBITMQ_PORT,
        username: process.env.RABBITMQ_USERNAME,
        password: process.env.RABBITMQ_PASSWORD
    }
    || 'amqp://localhost:5672';

async function sendMessage(msg) {
    const conn = await amqplib.connect(amqp_url, "heartbeat=60");
    const ch = await conn.createChannel()
    const exch = 'test';
    const queue = 'unchecked_imgs';
    const rkey = 'unchecked_imgs';
    await ch.assertExchange(exch, 'direct', {durable: true}).catch(console.error);
    await ch.assertQueue(queue, {durable: true});
    await ch.bindQueue(queue, exch, rkey);
    await ch.publish(exch, rkey, Buffer.from(msg));
    setTimeout(() => {
            ch.close()
            conn.close()
        },
        500)
}


// let rabbitMQMiddleware = util.promisify(sendMessage);
module.exports = sendMessage