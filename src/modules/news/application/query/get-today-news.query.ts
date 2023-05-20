export class GetTodayNewsQuery {
  private constructor() {}

  public static of(): GetTodayNewsQuery {
    return new GetTodayNewsQuery();
  }
}
