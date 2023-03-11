import {BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, Query} from "@nestjs/common";
import {User} from "../../infrastructure/model/user.entity";
import {ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetAllUsersResponse} from "./dto/response/get-all-users-response";
import {GetAllUsersQuery} from "./application/query/get-all-users.query";
import {MailAlreadyExistsException} from "./application/exception/mail-already-exists.exception";
import {RegisterCommand} from "./application/commands/register.command";
import {RegisterRequest} from "./dto/request/register-request.dto";
import {LoginRequest} from "./dto/request/login-request.dto";
import {LoginCommand} from "./application/commands/login.command";
import {LoginResponse} from "./dto/response/login-response-dto";
import {UserNotFoundException} from "../../shared/exceptions/user-not-found.exception";
import {PasswordsDoesNotMatch} from "./application/exception/password-does-not-match.exception";

@ApiTags('User')
@Controller('users')
export class UserController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Get('')
    async getAll() {
        try {
            return await this.queryBus.execute<GetAllUsersQuery, GetAllUsersResponse>(GetAllUsersQuery.of());
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Post('/login')
    async login(@Body() loginRequest: LoginRequest) {
        try {
            return await this.commandBus.execute<LoginCommand, LoginResponse>(
                LoginCommand.of(loginRequest),
            );
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                throw new UserNotFoundException();
            }
            if (error instanceof PasswordsDoesNotMatch) {
                throw new PasswordsDoesNotMatch();
            }
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Post('/register')
    async function(@Body() registerRequest: RegisterRequest) {
        try {
            await this.commandBus.execute<RegisterCommand, void>(
                RegisterCommand.of(registerRequest),
            );
        } catch (error) {
            if (error instanceof MailAlreadyExistsException) {
                throw new MailAlreadyExistsException();
            }
            console.error(error);
            throw new BadRequestException();
        }
    }
}
