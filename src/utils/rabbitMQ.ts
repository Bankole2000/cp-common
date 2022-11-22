import amqp from 'amqplib';

export const connect = async (url: string, queue: string, exchange: string, serviceName: string, emoji = '🐰') => {
  try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    const result = await channel.assertQueue(queue, { durable: true });
    await channel.assertExchange(exchange, 'fanout');
    console.log({ result });
    console.log(`🚀 ${emoji} \t${serviceName} RabbitMQ connected`);
    return { error: null, channel, connection };
  } catch (error) {
    console.log(error);
    return { error, channel: null, connection: null };
  }
};
// export default { connect };
