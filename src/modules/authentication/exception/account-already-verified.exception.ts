import {HttpException} from '@nestjs/common';
import {ErrorCode} from '../../../shared/enums/error-code.enum';

export class AccountAlreadyVerifiedException extends HttpException {
  constructor() {
    super('The account is already verified', ErrorCode.UNAUTHORIZED);
  }
}
