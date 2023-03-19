import {HttpException} from '@nestjs/common';
import {ErrorCode} from '../../../shared/enums/error-code.enum';

export class PasswordsDoesNotMatchException extends HttpException {
  constructor() {
    super('Passwords does not match', ErrorCode.BAD_REQUEST);
  }
}
