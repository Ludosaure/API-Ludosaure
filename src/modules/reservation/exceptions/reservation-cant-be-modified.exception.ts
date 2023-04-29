import { HttpException, HttpStatus } from "@nestjs/common";

export class ReservationCantBeModifiedException extends HttpException {
  constructor() {
    super("The reservation can't be modified because it's cancelled or already returned", HttpStatus.BAD_REQUEST);
  }
}
