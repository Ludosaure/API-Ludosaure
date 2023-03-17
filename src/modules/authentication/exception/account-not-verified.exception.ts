import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../../../shared/enums/error-code.enum';

export class AccountNotVerifiedException extends HttpException {
  constructor() {
    super('The account is not verified', ErrorCode.FORBIDDEN);
  }
}