// import { createClient, RedisClientType } from 'redis';
import { createClient } from 'redis';
// import NRP, { NodeRedisPubSub } from 'node-redis-pubsub';
import NRP from 'node-redis-pubsub';

export const redisConnect = (url: string, scope: string) => {
  const pubSub = NRP({ url, scope });
  const client = createClient({ url });
  return {
    pubSub,
    client
  };
};

export type RedisConnection = ReturnType<typeof redisConnect>;
