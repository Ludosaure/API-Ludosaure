
export class GetFavoriteByUserQuery {
  userId: string;

  private constructor(userId: string) {
    this.userId = userId;
  }

  static of(userId: string): GetFavoriteByUserQuery {
    return new GetFavoriteByUserQuery(userId);
  }
}
