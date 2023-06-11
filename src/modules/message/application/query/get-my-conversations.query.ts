export class GetMyConversationsQuery {
  userId: string;
  private constructor(userId: string) {
    this.userId = userId;
  }

  static of(userId: string): GetMyConversationsQuery {
    return new GetMyConversationsQuery(userId);
  }
}