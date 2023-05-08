export class CreateFavoriteCommand {
  gameId: string;
  userId: string;

  private constructor(gameId: string, userId: string) {
    this.gameId = gameId;
    this.userId = userId;
  }

  static of(gameId: string, userId: string): CreateFavoriteCommand {
    return new CreateFavoriteCommand(gameId, userId);
  }
}
