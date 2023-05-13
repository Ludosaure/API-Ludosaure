import {CommandHandler} from "@nestjs/cqrs";
import {CreateGameCommand} from "./create-game.command";
import {GameEntityRepository} from "../../game-entity.repository";
import {Game} from "../../../../domain/model/game.entity";
import {CategoryEntityRepository} from "../../../category/category-entity.repository";
import {CategoryNotFoundException} from "../../../../shared/exceptions/category-not-found.exception";
import { GameNameAlreadyExistsExceptions } from "../../exceptions/game-name-already-exists.exceptions";
import { Media } from "../../../../domain/model/media.entity";

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

        const foundGame = await this.gameRepository.findByName(command.name);
        if (foundGame != null) {
            throw new GameNameAlreadyExistsExceptions(command.name);
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
        game.weeklyAmount = command.weeklyAmount;
        game.category = foundCategory;
        if(command.pictureId != null) {
            const picture = new Media();
            picture.id = command.pictureId;
            game.picture = picture;
        }
        await this.gameRepository.saveOrUpdate(game);
    }
}
