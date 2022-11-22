import { RedisCustomClient } from './redisConnect';

export const serviceUp = async (redis: RedisCustomClient, list: string, serviceData: any) => {
  const services = await redis.client?.get(list);
  const upServices = await JSON.parse(services || '{}');

  if (!upServices[`${serviceData.self.serviceName}`]) {
    upServices[`${serviceData.self.serviceName}`] = {
      ...serviceData,
      url: `http://${serviceData.self.serviceHost}:${serviceData.self.port}`,
    };
    await redis.client?.set(list, JSON.stringify(upServices));
    console.log(`${serviceData.self.serviceName} newly Registered`);
  }
  console.log(`${serviceData.self.serviceName} already Registered`);
};

export const serviceDown = async (redis: RedisCustomClient, list: string, serviceName: string) => {
  const services = await redis.client?.get(list);
  const upServices = await JSON.parse(services || '{}');

  if (upServices[`${serviceName}`]) {
    delete upServices[`${serviceName}`];
    await redis.client?.set(list, JSON.stringify(upServices));
    console.log(`${serviceName} De-registered`);
  }
  console.log(`${serviceName} already De-registered`);
};
