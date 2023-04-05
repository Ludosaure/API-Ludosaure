import {CommandHandler} from "@nestjs/cqrs";
import {GameEntityRepository} from "../../game-entity.repository";
import {GameNotFoundException} from "../../../../shared/exceptions/game-not-found.exception";
import {DeleteGameCommand} from "./delete-game.command";

@CommandHandler(DeleteGameCommand)
export class DeleteGameHandler {

    constructor(private readonly gameRepository: GameEntityRepository
    ) {
    }

    async execute(command: DeleteGameCommand): Promise<void> {
        const foundGame = await this.gameRepository.findOneBy({id: command.id});
        if (foundGame == null) {
            throw new GameNotFoundException();
        }
        //TODO : check if game is not used in a reservation
        await this.gameRepository.deleteGame(foundGame);
    }
}
