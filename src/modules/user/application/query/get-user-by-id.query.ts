export class GetUserByIdQuery {
  public readonly userId: string;
  private constructor(userId: string) {
    this.userId = userId;
  }
  public static of(userId: string): GetUserByIdQuery {
    return new GetUserByIdQuery(userId);
  }
}
