import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { LoginRequestDto } from "./dto/request/login-request.dto";
import { LoginResponseDto } from "./dto/response/login-response.dto";
import { RegisterRequestDto } from "./dto/request/register-request.dto";
import { RegisterCommand } from "./application/commands/register.command";
import { ConfirmAccountRequestDto } from "./dto/request/confirm-account-request.dto";
import { ConfirmAccountCommand } from "./application/commands/confirm-account.command";
import { ResendConfirmationMailRequestDto } from "./dto/request/resend-confirmation-mail-request.dto";
import { ResendConfirmationMailCommand } from "./application/commands/resend-confirmation-mail.command";
import { AuthenticationService } from "./authentication.service";
import { LocalAuthGuard } from "../../shared/guards/local-auth.guard";
import { User } from "../../domain/model/user.entity";

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {

    constructor(private readonly commandBus: CommandBus,
                private readonly queryBus: QueryBus,
                private readonly authenticationService: AuthenticationService) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() loginRequest: LoginRequestDto, @Req() request) {
        const user : User = request.user;
        user.password = undefined;
        const token = this.authenticationService.getJwtToken(user.id);
        return new LoginResponseDto(token, user);
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

    @HttpCode(HttpStatus.OK)
    @Post('/resend-confirmation-mail')
    async resendConfirmationMail(@Body() resendConfirmationMailRequest: ResendConfirmationMailRequestDto) {
        await this.commandBus.execute<ResendConfirmationMailCommand>(
            ResendConfirmationMailCommand.of(resendConfirmationMailRequest),
        );
    }
}
