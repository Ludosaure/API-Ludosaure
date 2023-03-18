import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Req, UseGuards,
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
import {AccountNotVerifiedException} from "./exception/account-not-verified.exception";
import {AccountClosedException} from "./exception/account-closed.exception";
import {AccountAlreadyVerifiedException} from "./exception/account-already-verified.exception";
import {CloseAccountRequestDTO} from "./dto/request/close-account-request.dto";
import {CloseAccountCommand} from "./application/commands/close-account.command";
import {JwtAuthGuard} from "../../shared/jwt-auth.guard";
import {RolesGuard} from "../../shared/roles.guard";
import {Roles} from "../../shared/roles.decorator";
import {Role} from "../../infrastructure/model/enum/role";

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
  async register(@Body() registerRequest: RegisterRequestDTO) {
    try {
      await this.commandBus.execute<RegisterCommand, void>(
        RegisterCommand.of(registerRequest),
      );
    } catch (error) {
      if (error instanceof MailAlreadyUsedException) {
        throw new MailAlreadyUsedException();
      } else {
        console.error(error);
        throw new BadRequestException();
      }
    }
  }

  @Get('/confirm-account')
  async confirmAccount(@Query() confirmAccountRequest: ConfirmAccountRequestDTO) {
    try {
      await this.commandBus.execute<ConfirmAccountCommand, void>(
        ConfirmAccountCommand.of(confirmAccountRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      } else {
        console.error(error);
        throw new BadRequestException();
      }
    }
  }

  @Post('/resend-confirmation-mail')
  async resendConfirmationMail(@Body() resendConfirmationMailRequest: ResendConfirmationMailRequestDTO) {
    try {
      await this.commandBus.execute<ResendConfirmationMailCommand, void>(
          ResendConfirmationMailCommand.of(resendConfirmationMailRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      } else if (error instanceof AccountAlreadyVerifiedException) {
        throw new AccountAlreadyVerifiedException();
      } else {
        console.error(error);
        throw new BadRequestException();
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CLIENT, Role.ADMIN)
  @Post('/close-account')
  async closeAccount(@Body() closeAccountRequest: CloseAccountRequestDTO) {
    try {
      await this.commandBus.execute<CloseAccountCommand, void>(
        CloseAccountCommand.of(closeAccountRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      } else {
        console.error(error);
        throw new BadRequestException();
      }
    }
  }
}
