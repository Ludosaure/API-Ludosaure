import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {environmentConfig} from "../../../config/environment.config";
import {UserEntityRepository} from "../../user/db/user-entity-repository.service";
import {JwtPayload} from "./jwt.payload";
import {UserNotFoundException} from "../../../shared/exceptions/user-not-found.exception";
import {AccountNotVerifiedException} from "../exception/account-not-verified.exception";
import {AccountClosedException} from "../exception/account-closed.exception";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepository: UserEntityRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: environmentConfig.jwtAccessSecret,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userRepository.findById(payload.userId);

        if (!user) {
            throw new UserNotFoundException();
        } else if (!user.is_account_verified) {
            throw new AccountNotVerifiedException();
        } else if(user.is_account_closed) {
            throw new AccountClosedException();
        }
        return user;
    }
}
