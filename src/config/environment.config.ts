import * as process from "process";

export interface Config {
    port: number;
    dbUrl: string;
}

export class EnvironmentConfig implements Config {
    port: number;
    dbUrl: string;

    constructor() {
        this.port = Number(process.env.PORT) || 3000;
        console.log("process.env.DATABASE_URL: " + process.env.DATABASE_URL)
        this.dbUrl = process.env.DATABASE_URL;
        console.log("this.dbUrl: " + this.dbUrl)
    }
}

export const environmentConfig = new EnvironmentConfig();
