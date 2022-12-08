import { RedisConnection } from './redisConnect';

export const serviceUp = async (redis: RedisConnection, serviceData: any) => {
  await redis.client.connect();
  const { serviceName, queue } = serviceData.self;
  const { scope } = serviceData.redisConfig;
  const serviceConfig = {
    ...serviceData,
    url: `http://${serviceData.self.serviceHost}:${serviceData.self.port}`,
  };
  const serviceList = `${scope}-services`;
  const serviceQueues = `${scope}-queues`;
  const serviceExists = await redis.client.hGet(serviceList, serviceName);
  await redis.client.sAdd(serviceQueues, queue);
  if (serviceExists) {
    if (JSON.stringify(serviceConfig) === serviceExists) {
      console.log(`${serviceName} already registered`);
      await redis.client.disconnect();
      return;
    }
    await redis.client.hSet(serviceList, serviceName, JSON.stringify(serviceConfig));
    console.log(`${serviceName} registration updated`);
    await redis.client.disconnect();
    return;
  }
  await redis.client.hSet(serviceList, serviceName, JSON.stringify(serviceConfig));
  console.log(`${serviceName} newly Registered`);
  await redis.client.disconnect();
};

export const serviceDown = async (redis: RedisConnection, serviceData: any) => {
  await redis.client.connect();
  const { serviceName } = serviceData.self;
  const { scope } = serviceData.redisConfig;
  const serviceList = `${scope}-services`;
  const serviceExists = await redis.client.hGet(serviceList, serviceName);
  if (serviceExists) {
    await redis.client.hDel(serviceList, serviceName);
    console.log(`${serviceName} unregistered`);
    await redis.client.disconnect();
    return;
  }
  console.log(`${serviceName} not registered`);
  await redis.client.disconnect();
};
