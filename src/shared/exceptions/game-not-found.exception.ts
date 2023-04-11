import {HttpException, HttpStatus} from '@nestjs/common';

export class GameNotFoundException extends HttpException {
  constructor() {
    super('Game not found', HttpStatus.NOT_FOUND);
  }
}
