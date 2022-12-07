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

// export const serviceUp = async (redis: RedisConnection, list: string, serviceData: any) => {
//   await redis.client.connect();
//   const services = await redis.client?.get(list);
//   const upServices = await JSON.parse(services || '{}');
//   const serviceConfig = {
//     ...serviceData,
//     url: `http://${serviceData.self.serviceHost}:${serviceData.self.port}`,
//   };
//   if (!upServices[`${serviceData.self.serviceName}`]) {
//     upServices[`${serviceData.self.serviceName}`] = serviceConfig;
//     await redis.client?.set(list, JSON.stringify(upServices));
//     console.log(`${serviceData.self.serviceName} newly Registered`);
//     await redis.client.disconnect();
//     return;
//   }
//   if (JSON.stringify(upServices[`${serviceData.self.serviceName}`]) !== JSON.stringify(serviceConfig)) {
//     upServices[`${serviceData.self.serviceName}`] = serviceConfig;
//     await redis.client?.set(list, JSON.stringify(upServices));
//     console.log(`${serviceData.self.serviceName} updated`);
//     await redis.client.disconnect();
//     return;
//   }
//   console.log(`${serviceData.self.serviceName} already Registered`);
//   await redis.client.disconnect();
// };

// export const serviceDown = async (redis: RedisConnection, list: string, serviceName: string) => {
//   await redis.client.connect();
//   const services = await redis.client?.get(list);
//   const upServices = await JSON.parse(services || '{}');

//   if (upServices[`${serviceName}`]) {
//     delete upServices[`${serviceName}`];
//     await redis.client?.set(list, JSON.stringify(upServices));
//     console.log(`${serviceName} De-registered`);
//     await redis.client.disconnect();
//     return;
//   }
//   console.log(`${serviceName} already De-registered`);
//   await redis.client.disconnect();
// };
