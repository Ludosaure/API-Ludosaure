import {jwtConfig} from "../../../config/jwt.config";
import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {JwtPayload} from "./jwt.payload";
import {UserNotFoundException} from "../../../shared/exceptions/user-not-found.exception";
import {AccountNotVerifiedException} from "../exception/account-not-verified.exception";
import {AccountClosedException} from "../exception/account-closed.exception";
import {UserEntityRepository} from "../../user/user-entity.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepository: UserEntityRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.jwtAccessSecret,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userRepository.findById(payload.userId);

        if (!user) {
            throw new UserNotFoundException();
        } else if (!user.isAccountVerified) {
            throw new AccountNotVerifiedException();
        } else if(user.isAccountClosed) {
            throw new AccountClosedException();
        }
        return user;
    }
}
