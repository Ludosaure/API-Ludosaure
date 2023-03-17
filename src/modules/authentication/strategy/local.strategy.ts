import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {CommandBus} from "@nestjs/cqrs";
import {User} from "../../../infrastructure/model/user.entity";
import {LoginCommand} from "../application/commands/login.command";
import {LoginResponseDTO} from "../dto/response/login-response.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly commandBus: CommandBus) {
        console.log('LocalStrategy')
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string): Promise<User> {
        console.log(email, password)
        const response = await this.commandBus.execute<LoginCommand, LoginResponseDTO>(
            LoginCommand.of({email: email, password: password}),
        );
        return response.user;
    }
}
