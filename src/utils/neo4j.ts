import neo4j, { Driver } from 'neo4j-driver';

let driver: Driver;

export const initDriver = async (uri: string, username: string, password: string) => {
  driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
  await driver.getServerInfo();
  return driver;
};

export const getDriver = () => driver;

export const closeDriver = () => driver && driver.close();
