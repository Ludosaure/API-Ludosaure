import { HttpException, HttpStatus } from "@nestjs/common";

export class ReviewNotFoundException extends HttpException {
  constructor() {
    super("Review not found", HttpStatus.NOT_FOUND);
  }
}
