import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../../../shared/error-code.enum';

export class MailAlreadyUsedException extends HttpException {
  constructor() {
    super('Mail already exists', ErrorCode.CONFLICT);
  }
}
