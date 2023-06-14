import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationCantBeDeletedException extends HttpException {
  constructor() {
    super(
      "The reservation can't be deleted because it has already been paid",
      HttpStatus.BAD_REQUEST,
    );
  }
}
