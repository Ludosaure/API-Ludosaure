import {HttpException} from '@nestjs/common';
import {ErrorCode} from '../../../shared/enums/error-code.enum';

export class PasswordAndConfirmPasswordNotMatchException extends HttpException {
  constructor() {
    super(
      'Passwords and confirm password are not matching',
      ErrorCode.BAD_REQUEST,
    );
  }
}
