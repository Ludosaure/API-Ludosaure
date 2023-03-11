import {BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, Query} from "@nestjs/common";
import {User} from "../../infrastructure/model/user.entity";
import {ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetAllUsersResponseDto} from "./dto/response/get-all-users-response.dto";
import {GetAllUsersQuery} from "./application/query/get-all-users.query";
import {MailAlreadyUsedException} from "../authentication/exception/mail-already-used.exception";
import {RegisterCommand} from "../authentication/application/commands/register.command";
import {RegisterRequestDTO} from "../dto/request/register-request.dto";
import {LoginRequestDTO} from "../dto/request/login-request.dto";
import {LoginCommand} from "../authentication/application/commands/login.command";
import {UserNotFoundException} from "../../shared/exceptions/user-not-found.exception";
import {PasswordsDoesNotMatchException} from "../authentication/exception/password-does-not-match.exception";
import {LoginResponseDTO} from "../dto/response/login-response.dto";

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
            return await this.queryBus.execute<GetAllUsersQuery, GetAllUsersResponseDto>(GetAllUsersQuery.of());
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }
}
