export interface Config {
    port: number;
}

export class EnvironmentConfig implements Config {
    port: number;

    constructor() {
        this.port = Number(process.env.PORT) || 3000;
    }
}
export const environmentConfig = new EnvironmentConfig();
