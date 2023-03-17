import { ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginRequestDTO } from './dto/request/login-request.dto';
import { LoginCommand } from './application/commands/login.command';
import { LoginResponseDTO } from './dto/response/login-response.dto';
import { UserNotFoundException } from '../../shared/exceptions/user-not-found.exception';
import { PasswordsDoesNotMatchException } from './exception/password-does-not-match.exception';
import { RegisterRequestDTO } from './dto/request/register-request.dto';
import { RegisterCommand } from './application/commands/register.command';
import { MailAlreadyUsedException } from './exception/mail-already-used.exception';

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
  async login(@Body() loginRequest: LoginRequestDTO) {
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
  async function(@Body() registerRequest: RegisterRequestDTO) {
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
}
