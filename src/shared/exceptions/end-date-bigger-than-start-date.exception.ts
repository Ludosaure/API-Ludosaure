import {HttpException, HttpStatus} from '@nestjs/common';

export class EndDateBiggerThanStartDateException extends HttpException {
  constructor() {
    super('Start date must be before end date', HttpStatus.BAD_REQUEST);
  }
}
