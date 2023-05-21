export class GetAllNewsQuery {
  private constructor() {}

  public static of(): GetAllNewsQuery {
    return new GetAllNewsQuery();
  }
}
