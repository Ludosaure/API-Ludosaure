import {ICommandHandler, QueryHandler} from "@nestjs/cqrs";
import {GameEntityRepository} from "../../game-entity.repository";
import {GetGameByIdQuery} from "./get-game-by-id.query";
import {GameNotFoundException} from "../../../../shared/exceptions/game-not-found.exception";
import {GetGameByIdResponseDto} from "../../dto/response/get-game-by-id-response.dto";

@QueryHandler(GetGameByIdQuery)
export class GetGameByIdHandler implements ICommandHandler<GetGameByIdQuery> {

    constructor(private readonly gameRepository: GameEntityRepository) {
    }
    async execute(query: GetGameByIdQuery): Promise<GetGameByIdResponseDto> {
        const game = await this.gameRepository.findById(query.id);
        if (game == null) {
            throw new GameNotFoundException();
        }
        return new GetGameByIdResponseDto(game);
    }
}
