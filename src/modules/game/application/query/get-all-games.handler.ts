import {ICommandHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllGamesQuery} from "./get-all-games.query";
import {GameEntityRepository} from "../../game-entity.repository";
import {GetAllGamesResponseDTO} from "../../dto/response/get-all-games-response.dto";

@QueryHandler(GetAllGamesQuery)
export class GetAllGamesHandler implements ICommandHandler<GetAllGamesQuery> {

    constructor(private readonly gameRepository: GameEntityRepository) {
    }
    async execute(): Promise<GetAllGamesResponseDTO> {
        const games = await this.gameRepository.find();
        return new GetAllGamesResponseDTO(games);
    }
}