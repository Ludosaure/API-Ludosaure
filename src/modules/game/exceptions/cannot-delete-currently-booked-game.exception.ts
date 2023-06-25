import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotDeleteCurrentlyBookedGameException extends HttpException {
  constructor() {
    super('Cannot delete currently booked game', HttpStatus.BAD_REQUEST);
  }
}
