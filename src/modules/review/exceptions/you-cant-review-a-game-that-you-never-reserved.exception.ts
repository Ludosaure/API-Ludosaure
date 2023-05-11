import { HttpException, HttpStatus } from "@nestjs/common";

export class YouCantReviewAGameThatYouNeverReservedException extends HttpException {
  constructor() {
    super("You can't review a game that you never reserved", HttpStatus.BAD_REQUEST);
  }
}
