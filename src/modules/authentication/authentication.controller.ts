import {ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Post, Query, Req,} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {LoginRequestDto} from './dto/request/login-request.dto';
import {LoginCommand} from './application/commands/login.command';
import {LoginResponseDto} from './dto/response/login-response.dto';
import {RegisterRequestDto} from './dto/request/register-request.dto';
import {RegisterCommand} from './application/commands/register.command';
import {ConfirmAccountRequestDto} from "./dto/request/confirm-account-request.dto";
import {ConfirmAccountCommand} from "./application/commands/confirm-account.command";
import {ResendConfirmationMailRequestDto} from "./dto/request/resend-confirmation-mail-request.dto";
import {ResendConfirmationMailCommand} from "./application/commands/resend-confirmation-mail.command";

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Post('/login')
    async login(@Body() loginRequest: LoginRequestDto, @Req() request) {
        return await this.commandBus.execute<LoginCommand, LoginResponseDto>(
            LoginCommand.of(loginRequest),
        );
    }

    @Post('/register')
    async register(@Body() registerRequest: RegisterRequestDto) {
        await this.commandBus.execute<RegisterCommand>(
            RegisterCommand.of(registerRequest),
        );
    }

    @Get('/confirm-account')
    async confirmAccount(@Query() confirmAccountRequest: ConfirmAccountRequestDto) {
        await this.commandBus.execute<ConfirmAccountCommand>(
            ConfirmAccountCommand.of(confirmAccountRequest),
        );
    }

    @Post('/resend-confirmation-mail')
    async resendConfirmationMail(@Body() resendConfirmationMailRequest: ResendConfirmationMailRequestDto) {
        await this.commandBus.execute<ResendConfirmationMailCommand>(
            ResendConfirmationMailCommand.of(resendConfirmationMailRequest),
        );
    }
}
