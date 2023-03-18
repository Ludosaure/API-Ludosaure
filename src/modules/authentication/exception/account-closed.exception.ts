import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../../../shared/enums/error-code.enum';

export class AccountClosedException extends HttpException {
  constructor() {
    super('The account is closed', ErrorCode.UNAUTHORIZED);
  }
}
