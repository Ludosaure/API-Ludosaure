import * as process from 'process';

export interface Config {
  port: number;
  dbUrl: string;
  dataSourceType: any;
  dataSourceHost: string;
  dataSourceUsername: string;
  dataSourcePassword: string;
  dataSourcePort: number;
  jwtAccessSecret: string;
  jwtAccessTokenDuration: string;
}

export class EnvironmentConfig implements Config {
  port: number;
  dbUrl: string;
  dataSourceType: any;
  dataSourceHost: string;
  dataSourceUsername: string;
  dataSourcePassword: string;
  dataSourcePort: number;
  jwtAccessSecret: string;
  jwtAccessTokenDuration: string;

  constructor() {
    this.port = Number(process.env.PORT) || 3000;
    this.dbUrl = process.env.DATABASE_URL;
    this.dataSourceType = 'postgres';
    this.dataSourceHost = process.env.RDS_HOSTNAME;
    this.dataSourceUsername = process.env.RDS_USERNAME;
    this.dataSourcePassword = process.env.RDS_PASSWORD;
    this.dataSourcePort = Number(process.env.RDS_PORT);
    this.jwtAccessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    this.jwtAccessTokenDuration = process.env.JWT_ACCESS_TOKEN_DURATION;
  }
}

export const environmentConfig = new EnvironmentConfig();
