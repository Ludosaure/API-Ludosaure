import {ApiTags} from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {LoginRequestDTO} from './dto/request/login-request.dto';
import {LoginCommand} from './application/commands/login.command';
import {LoginResponseDTO} from './dto/response/login-response.dto';
import {UserNotFoundException} from '../../shared/exceptions/user-not-found.exception';
import {PasswordsDoesNotMatchException} from './exception/password-does-not-match.exception';
import {RegisterRequestDTO} from './dto/request/register-request.dto';
import {RegisterCommand} from './application/commands/register.command';
import {MailAlreadyUsedException} from './exception/mail-already-used.exception';
import {ConfirmAccountRequestDTO} from "./dto/request/confirm-account-request.dto";
import {ConfirmAccountCommand} from "./application/commands/confirm-account.command";
import {ResendConfirmationMailRequestDTO} from "./dto/request/resend-confirmation-mail-request.dto";
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
  async login(@Body() loginRequest: LoginRequestDTO, @Req() request) {
    try {
      return await this.commandBus.execute<LoginCommand, LoginResponseDTO>(
        LoginCommand.of(loginRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      }
      if (error instanceof PasswordsDoesNotMatchException) {
        throw new PasswordsDoesNotMatchException();
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Post('/register')
  async register(@Body() registerRequest: RegisterRequestDTO) {
    try {
      await this.commandBus.execute<RegisterCommand, void>(
        RegisterCommand.of(registerRequest),
      );
    } catch (error) {
      if (error instanceof MailAlreadyUsedException) {
        throw new MailAlreadyUsedException();
      }
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Post('/resend-confirmation-mail')
  async resendConfirmationMail(@Body() resendConfirmationMailRequest: ResendConfirmationMailRequestDTO) {
    try {
      await this.commandBus.execute<ResendConfirmationMailCommand, void>(
        ResendConfirmationMailCommand.of(resendConfirmationMailRequest),
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Get('/confirm-account')
  async confirm(@Query() confirmAccountRequest: ConfirmAccountRequestDTO) {
    try {
      await this.commandBus.execute<ConfirmAccountCommand, void>(
        ConfirmAccountCommand.of(confirmAccountRequest),
      );
    } catch (error) {
      if (error instanceof MailAlreadyUsedException) {
        throw new MailAlreadyUsedException();
      }
      console.error(error);
      throw new BadRequestException();
    }
  }
}
