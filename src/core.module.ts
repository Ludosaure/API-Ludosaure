import {JwtModule} from "@nestjs/jwt";
import {environmentConfig} from "./config/environment.config";
import {Global, Module} from "@nestjs/common";

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
