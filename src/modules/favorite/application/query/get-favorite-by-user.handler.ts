import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetFavoriteByUserQuery } from "./get-favorite-by-user.query";
import { GetFavoriteByUserResponseDto } from "../../dto/response/get-favorite-by-user-response.dto";
import { FavoriteEntityRepository } from "../../favorite-entity.repository";

@QueryHandler(GetFavoriteByUserQuery)
export class GetFavoriteByUserHandler implements IQueryHandler<GetFavoriteByUserQuery> {
  constructor(private readonly favoriteRepository: FavoriteEntityRepository) {
  }

  async execute(query: GetFavoriteByUserQuery): Promise<GetFavoriteByUserResponseDto> {
    const favoriteUsers = await this.favoriteRepository.findByUserId(query.userId);
    return new GetFavoriteByUserResponseDto(favoriteUsers);
  }
}
