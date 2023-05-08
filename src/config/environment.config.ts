import * as process from 'process';

export interface IEnvironmentConfig {
    port: number;
    dbUrl: string;
    dataSourceType: any;
    dataSourceHost: string;
    dataSourceUsername: string;
    dataSourcePassword: string;
    dataSourcePort: number;
    cgvFilePath: string;
}

export class EnvironmentConfig implements IEnvironmentConfig {
    port: number;
    dbUrl: string;
    dataSourceType: any;
    dataSourceHost: string;
    dataSourceUsername: string;
    dataSourcePassword: string;
    dataSourcePort: number;
    cgvFilePath: string;

    constructor() {
        this.port = Number(process.env.PORT) || 3000;
        this.dbUrl = process.env.DATABASE_URL;
        this.dataSourceType = 'postgres';
        this.dataSourceHost = process.env.RDS_HOSTNAME;
        this.dataSourceUsername = process.env.RDS_USERNAME;
        this.dataSourcePassword = process.env.RDS_PASSWORD;
        this.dataSourcePort = Number(process.env.RDS_PORT);
        this.cgvFilePath = process.env.CGV_FILE_PATH;
    }
}

export const environmentConfig = new EnvironmentConfig();
