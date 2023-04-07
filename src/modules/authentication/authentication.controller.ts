import {ApiTags} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {LoginRequestDto} from './dto/request/login-request.dto';
import {LoginCommand} from './application/commands/login.command';
import {LoginResponseDto} from './dto/response/login-response.dto';
import {UserNotFoundException} from '../../shared/exceptions/user-not-found.exception';
import {PasswordsDoesNotMatchException} from './exception/password-does-not-match.exception';
import {RegisterRequestDto} from './dto/request/register-request.dto';
import {RegisterCommand} from './application/commands/register.command';
import {MailAlreadyUsedException} from './exception/mail-already-used.exception';
import {ConfirmAccountRequestDto} from "./dto/request/confirm-account-request.dto";
import {ConfirmAccountCommand} from "./application/commands/confirm-account.command";
import {ResendConfirmationMailRequestDto} from "./dto/request/resend-confirmation-mail-request.dto";
import {ResendConfirmationMailCommand} from "./application/commands/resend-confirmation-mail.command";
import {AccountNotVerifiedException} from "./exception/account-not-verified.exception";
import {AccountClosedException} from "./exception/account-closed.exception";
import {AccountAlreadyVerifiedException} from "./exception/account-already-verified.exception";
import {PasswordAndConfirmPasswordNotMatchException} from "./exception/password-and-confirm-not-match.exception";
import {BadPasswordFormatException} from "./exception/bad-password-format.exception";

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
    try {
      return await this.commandBus.execute<LoginCommand, LoginResponseDto>(
        LoginCommand.of(loginRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      } else if (error instanceof AccountNotVerifiedException) {
        throw new AccountNotVerifiedException();
      } else if (error instanceof AccountClosedException) {
        throw new AccountClosedException();
      } else if (error instanceof PasswordsDoesNotMatchException) {
        throw new PasswordsDoesNotMatchException();
      } else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  @Post('/register')
  async register(@Body() registerRequest: RegisterRequestDto) {
    try {
      await this.commandBus.execute<RegisterCommand>(
        RegisterCommand.of(registerRequest),
      );
    } catch (error) {
      if (error instanceof MailAlreadyUsedException) {
          throw new MailAlreadyUsedException();
      } else if (error instanceof PasswordAndConfirmPasswordNotMatchException) {
          throw new PasswordAndConfirmPasswordNotMatchException();
      } else if( error instanceof BadPasswordFormatException) {
          throw new BadPasswordFormatException();
      } else {
          console.error(error);
          throw new InternalServerErrorException();
      }
    }
  }

  @Get('/confirm-account')
  async confirmAccount(@Query() confirmAccountRequest: ConfirmAccountRequestDto) {
    try {
      await this.commandBus.execute<ConfirmAccountCommand>(
        ConfirmAccountCommand.of(confirmAccountRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      } else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  @Post('/resend-confirmation-mail')
  async resendConfirmationMail(@Body() resendConfirmationMailRequest: ResendConfirmationMailRequestDto) {
    try {
      await this.commandBus.execute<ResendConfirmationMailCommand>(
          ResendConfirmationMailCommand.of(resendConfirmationMailRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      } else if (error instanceof AccountAlreadyVerifiedException) {
        throw new AccountAlreadyVerifiedException();
      } else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
