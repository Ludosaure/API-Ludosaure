import {ICommandHandler, QueryHandler} from "@nestjs/cqrs";
import {GameEntityRepository} from "../../game-entity.repository";
import {GetGamesByNameQuery} from "./get-games-by-name.query";
import {GetGamesByNameResponseDto} from "../../dto/response/get-games-by-name-response.dto";
import { ReviewEntityRepository } from "../../../review/review-entity.repository";

@QueryHandler(GetGamesByNameQuery)
export class GetGamesByNameHandler implements ICommandHandler<GetGamesByNameQuery> {

    constructor(private readonly gameRepository: GameEntityRepository,
                private readonly reviewRepository: ReviewEntityRepository) {
    }
    async execute(query: GetGamesByNameQuery): Promise<GetGamesByNameResponseDto> {
        const games = await this.gameRepository.findByName(query.name)
        for (const game of games) {
            game.averageRating = await this.reviewRepository.findAverageRatingByGameId(game.id);
            game.nbReviews = await this.reviewRepository.countReviewsByGameId(game.id);
        }
        return new GetGamesByNameResponseDto(games);
    }
}
