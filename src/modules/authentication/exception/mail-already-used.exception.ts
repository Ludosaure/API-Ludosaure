import {HttpException, HttpStatus} from '@nestjs/common';

export class MailAlreadyUsedException extends HttpException {
  constructor() {
    super('Mail already exists', HttpStatus.CONFLICT);
  }
}
