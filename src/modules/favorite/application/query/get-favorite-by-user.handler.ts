import { QueryHandler } from "@nestjs/cqrs";
import { GetFavoriteByUserQuery } from "./get-favorite-by-user.query";
import { GetFavoriteByUserResponseDto } from "../../dto/response/get-favorite-by-user-response.dto";
import { FavoriteRepository } from "../../../../infrastructure/favorite.repository";

@QueryHandler(GetFavoriteByUserQuery)
export class GetFavoriteByUserHandler {
  constructor(private readonly favoriteRepository: FavoriteRepository) {
  }

  async execute(query: GetFavoriteByUserQuery): Promise<GetFavoriteByUserResponseDto> {
    const favoriteUsers = await this.favoriteRepository.findByUserId(query.userId);
    return new GetFavoriteByUserResponseDto(favoriteUsers);
  }
}
