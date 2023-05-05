import { GetFavoriteByUserRequestDto } from "../../dto/request/get-favorite-by-user-request.dto";

export class GetFavoriteByUserQuery {
  userId: string;

  private constructor(userId: string) {
    this.userId = userId;
  }

  static of(getFavoriteByUserRequestDto: GetFavoriteByUserRequestDto): GetFavoriteByUserQuery {
    const { userId } = getFavoriteByUserRequestDto;
    return new GetFavoriteByUserQuery(userId);
  }
}
