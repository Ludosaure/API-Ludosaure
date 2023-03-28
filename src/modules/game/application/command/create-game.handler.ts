import {CommandHandler} from "@nestjs/cqrs";
import {CreateGameCommand} from "./create-game.command";
import {GameEntityRepository} from "../../game-entity.repository";
import {Game} from "../../../../infrastructure/model/game.entity";
import {CategoryEntityRepository} from "../../../category/category-entity.repository";
import {CategoryNotFoundException} from "../../../../shared/exceptions/category-not-found.exception";

@CommandHandler(CreateGameCommand)
export class CreateGameHandler {

    constructor(
        private readonly gameRepository: GameEntityRepository,
        private readonly categoryRepository: CategoryEntityRepository
    ) {
    }

    async execute(command: CreateGameCommand): Promise<void> {
        const foundCategory = await this.categoryRepository.findOneBy({id: command.categoryId});
        if (foundCategory == null) {
            throw new CategoryNotFoundException();
        }

        const game = new Game();
        game.name = command.name;
        if (command.description) {
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
