import { HttpException } from "@nestjs/common";

export class GameAlreadyInYourFavoritesException extends HttpException {
  constructor() {
    super("Game already in your favorites", 400);
  }
}
