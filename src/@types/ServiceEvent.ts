// import config from 'config';
import { AppEvent } from './AppInterfaces';

export class ServiceEvent implements AppEvent {
  type: string;

  data: any;

  origin: string;

  idToken: string | null;

  accessToken: string | null;

  serviceQueues: string[];

  constructor(
    type: string,
    data: any,
    idToken: string | null,
    accessToken: string | null,
    // origin = config.get<string>('self.serviceName')
    origin = process.env.SERVICE_NAME || 'UNKNOWN',
    serviceQueues = [],
  ) {
    this.type = type;
    this.data = data;
    this.origin = origin;
    this.idToken = idToken;
    this.accessToken = accessToken;
    this.serviceQueues = serviceQueues;
  }
}
