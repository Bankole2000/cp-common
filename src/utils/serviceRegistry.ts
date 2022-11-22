import { RedisConnection } from './redisConnect';

export const serviceUp = async (redis: RedisConnection, list: string, serviceData: any) => {
  await redis.client.connect();
  const services = await redis.client?.get(list);
  const upServices = await JSON.parse(services || '{}');

  if (!upServices[`${serviceData.self.serviceName}`]) {
    upServices[`${serviceData.self.serviceName}`] = {
      ...serviceData,
      url: `http://${serviceData.self.serviceHost}:${serviceData.self.port}`,
    };
    await redis.client?.set(list, JSON.stringify(upServices));
    console.log(`${serviceData.self.serviceName} newly Registered`);
    await redis.client.disconnect();
    return;
  }
  console.log(`${serviceData.self.serviceName} already Registered`);
  await redis.client.disconnect();
};

export const serviceDown = async (redis: RedisConnection, list: string, serviceName: string) => {
  await redis.client.connect();
  const services = await redis.client?.get(list);
  const upServices = await JSON.parse(services || '{}');

  if (upServices[`${serviceName}`]) {
    delete upServices[`${serviceName}`];
    await redis.client?.set(list, JSON.stringify(upServices));
    console.log(`${serviceName} De-registered`);
    await redis.client.disconnect();
    return;
  }
  console.log(`${serviceName} already De-registered`);
  await redis.client.disconnect();
};
