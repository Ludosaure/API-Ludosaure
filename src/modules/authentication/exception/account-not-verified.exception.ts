import {HttpException, HttpStatus} from '@nestjs/common';

export class AccountNotVerifiedException extends HttpException {
  constructor() {
    super('The account is not verified', HttpStatus.FORBIDDEN);
  }
}
