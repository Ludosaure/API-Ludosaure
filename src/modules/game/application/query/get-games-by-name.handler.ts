import {ICommandHandler, QueryHandler} from "@nestjs/cqrs";
import {GameEntityRepository} from "../../game-entity.repository";
import {GetGamesByNameQuery} from "./get-games-by-name.query";
import {GetGamesByNameResponseDto} from "../../dto/response/get-games-by-name-response.dto";

@QueryHandler(GetGamesByNameQuery)
export class GetGamesByNameHandler implements ICommandHandler<GetGamesByNameQuery> {

    constructor(private readonly gameRepository: GameEntityRepository) {
    }
    async execute(query: GetGamesByNameQuery): Promise<GetGamesByNameResponseDto> {
        const games = await this.gameRepository.findByName(query.name)
        return new GetGamesByNameResponseDto(games);
    }
}
