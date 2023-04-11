import {HttpException, HttpStatus} from '@nestjs/common';

export class PasswordsDoesNotMatchException extends HttpException {
  constructor() {
    super('Passwords does not match', HttpStatus.BAD_REQUEST);
  }
}
