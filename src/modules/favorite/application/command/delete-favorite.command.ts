export class DeleteFavoriteCommand {
  gameId: string;
  userId: string;

  private constructor(gameId: string, userId: string) {
    this.gameId = gameId;
    this.userId = userId;
  }

  static of(gameId: string, userId: string): DeleteFavoriteCommand {
    return new DeleteFavoriteCommand(gameId, userId);
  }
}
