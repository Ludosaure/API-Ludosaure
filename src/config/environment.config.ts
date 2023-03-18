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
    emailConfirmationUrl: string;
    emailService: string;
    emailUser: string;
    emailPassword: string;
    generatedEmailPassword: string;

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
    emailConfirmationUrl: string;
    emailService: string;
    emailUser: string;
    emailPassword: string;
    generatedEmailPassword: string;

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
        this.emailConfirmationUrl = process.env.EMAIL_CONFIRMATION_URL;
        this.emailService = process.env.EMAIL_SERVICE;
        this.emailUser = process.env.EMAIL_USER;
        this.emailPassword = process.env.EMAIL_PASSWORD;
        this.generatedEmailPassword = process.env.GENERATED_EMAIL_PASSWORD;
    }
}

export const environmentConfig = new EnvironmentConfig();
