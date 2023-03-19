import {HttpException} from '@nestjs/common';
import {ErrorCode} from '../../../shared/enums/error-code.enum';

export class BadPasswordFormatException extends HttpException {
  constructor() {
    super(
      'Password format is not correct. It must contain at least 8 characters, one uppercase letter, ' +
        'one lowercase letter, one number and one special character',
      ErrorCode.BAD_REQUEST,
    );
  }
}
