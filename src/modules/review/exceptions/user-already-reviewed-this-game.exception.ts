import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyReviewedThisGameException extends HttpException {
  constructor() {
    super("User already reviewed this game", HttpStatus.BAD_REQUEST);
  }
}
