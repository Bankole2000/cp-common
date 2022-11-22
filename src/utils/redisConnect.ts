import { createClient, RedisClientType } from 'redis';
import NRP, { NodeRedisPubSub } from 'node-redis-pubsub';

export const redisConnect = async (url: string, scope: string) => {
  const pubSub = NRP({ url, scope });
  const client = createClient({ url });
  try {
    await client.connect();
    client.on('error', (error) => {
      console.error(error);
      // report error to logging service (e.g. Sentry/PM2)
    });
    return { error: null, client, pubSub };
  } catch (error) {
    console.log({ error });
    return { error, client: null, pubSub: null };
    // process.exit(1);
  }
};

// type RedisConnection = ReturnType<typeof redisConnect>;

export type RedisCustomClient = {
  client: RedisClientType;
  pubSub: NodeRedisPubSub;
  error?: any;
};
