import {QueryHandler} from "@nestjs/cqrs";
import {GetUnavailabilitiesByGameIdQuery} from "./get-unavailabilities-by-game-id.query";
import {UnavailabilityEntityRepository} from "../../unavailability-entity.repository";
import {Unavailability} from "../../../../domain/model/unavailability.entity";
import {GameEntityRepository} from "../../../game/game-entity.repository";
import {GameNotFoundException} from "../../../../shared/exceptions/game-not-found.exception";

@QueryHandler(GetUnavailabilitiesByGameIdQuery)
export class GetUnavailabilitiesByGameIdHandler {
    constructor(private readonly unavailabilityRepository: UnavailabilityEntityRepository,
                private readonly gameRepository: GameEntityRepository) {
    }

    async execute(query: GetUnavailabilitiesByGameIdQuery): Promise<Unavailability[]> {
        const foundGame = this.gameRepository.findById(query.gameId);
        if(foundGame == null) {
            throw new GameNotFoundException();
        }
        return await this.unavailabilityRepository.findByGameId(query.gameId);
    }
}
