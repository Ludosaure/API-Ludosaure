import {JwtModule} from "@nestjs/jwt";
import {Global, Module} from "@nestjs/common";
import {jwtConfig} from "./config/jwt.config";

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: jwtConfig.jwtAccessSecret,
            signOptions: {expiresIn: jwtConfig.jwtAccessTokenDuration},
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
