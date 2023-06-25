import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotDeleteUnavailableGameException extends HttpException {
  constructor() {
    super('Cannot delete unavailable game', HttpStatus.BAD_REQUEST);
  }
}
