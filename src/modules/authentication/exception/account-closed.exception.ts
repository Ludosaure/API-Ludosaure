import {HttpException, HttpStatus} from '@nestjs/common';

export class AccountClosedException extends HttpException {
  constructor() {
    super('The account is closed', HttpStatus.BAD_REQUEST);
  }
}
