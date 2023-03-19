import {JwtModule} from "@nestjs/jwt";
import {environmentConfig} from "./config/environment.config";
import {Global, Module} from "@nestjs/common";
import {JwtStrategy} from "./modules/authentication/strategy/jwt.strategy";

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: environmentConfig.jwtAccessSecret,
            signOptions: {expiresIn: environmentConfig.jwtAccessTokenDuration},
        }),
    ],
    providers: [
    ],
    exports: [
        JwtModule,
    ]
})
export class CoreModule {
}
