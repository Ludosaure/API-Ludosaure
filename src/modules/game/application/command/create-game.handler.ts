import {CommandHandler} from "@nestjs/cqrs";
import {CreateGameCommand} from "./create-game.command";
import {GameEntityRepository} from "../../game-entity.repository";
import {Game} from "../../../../infrastructure/model/game.entity";

@CommandHandler(CreateGameCommand)
export class CreateGameHandler {

    constructor(private readonly gameRepository: GameEntityRepository) {}
    async execute(command: CreateGameCommand): Promise<void>{
        // TODO controle category
        const game = new Game();
        game.name = command.name;
        if(command.description) {
            game.description = command.description;
        }
        game.nbPlayersMin = command.nbPlayersMin;
        game.nbPlayersMax = command.nbPlayersMax;
        game.averageDuration = command.averageDuration;
        game.ageMin = command.ageMin;
        game.ageMax = command.ageMax;
        game.weeklyAmount = command.weeklyAmount;
        game.categoryId = command.categoryId;
        await this.gameRepository.saveOrUpdateGame(game);
    }
}
