import * as process from 'process';

export interface IJwtConfig {
    jwtAccessSecret: string;
    jwtAccessTokenDuration: string;

}

export class JwtConfig implements IJwtConfig {
    jwtAccessSecret: string;
    jwtAccessTokenDuration: string;

    constructor() {
        this.jwtAccessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
        this.jwtAccessTokenDuration = process.env.JWT_ACCESS_TOKEN_DURATION;
    }
}

export const jwtConfig = new JwtConfig();
