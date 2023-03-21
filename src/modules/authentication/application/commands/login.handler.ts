import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {LoginCommand} from './login.command';
import {UserNotFoundException} from 'src/shared/exceptions/user-not-found.exception';
import {PasswordsDoesNotMatchException} from '../../exception/password-does-not-match.exception';
import {JwtService} from '@nestjs/jwt';
import {verify} from 'argon2';
import {AccountNotVerifiedException} from '../../exception/account-not-verified.exception';
import {UserEntityRepository} from '../../../user/db/user-entity-repository.service';
import {LoginResponseDTO} from '../../dto/response/login-response.dto';
import {AccountClosedException} from "../../exception/account-closed.exception";

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
    constructor(
        private readonly userRepository: UserEntityRepository,
        private readonly jwtService: JwtService,
    ) {
    }

    async execute(command: LoginCommand): Promise<LoginResponseDTO> {
        const {email, password} = command;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UserNotFoundException();
        }
        if (!user.is_account_verified) {
            throw new AccountNotVerifiedException();
        }
        if (user.is_account_closed) {
            throw new AccountClosedException();
        }

        const passwordMatched = await verify(user.password, password);
        if (!passwordMatched) {
            throw new PasswordsDoesNotMatchException();
        }

        const token = this.jwtService.sign({userId: user.id});
        return new LoginResponseDTO(token, user);
    }
}
