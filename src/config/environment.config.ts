import * as process from 'process';

export interface Config {
  port: number;
  dbUrl: string;
}

export class EnvironmentConfig implements Config {
  port: number;
  dbUrl: string;

  constructor() {
    this.port = Number(process.env.PORT) || 3000;
    this.dbUrl = process.env.DATABASE_URL;
  }
}

export const environmentConfig = new EnvironmentConfig();
