import {HttpException, HttpStatus} from '@nestjs/common';

export class AccountAlreadyVerifiedException extends HttpException {
  constructor() {
    super('The account is already verified', HttpStatus.UNAUTHORIZED);
  }
}
