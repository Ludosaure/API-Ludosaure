import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateGameCommand } from "./create-game.command";
import { GameEntityRepository } from "../../game-entity.repository";
import { Game } from "../../../../domain/model/game.entity";
import { CategoryEntityRepository } from "../../../category/category-entity.repository";
import { CategoryNotFoundException } from "../../../../shared/exceptions/category-not-found.exception";
import { GameNameAlreadyExistsExceptions } from "../../exceptions/game-name-already-exists.exceptions";
import { MediaNotFoundException } from "../../../../shared/exceptions/media-not-found.exception";
import { MediaEntityRepository } from "../../../media/media-entity.repository";

@CommandHandler(CreateGameCommand)
export class CreateGameHandler implements ICommandHandler<CreateGameCommand> {

    constructor(
        private readonly gameRepository: GameEntityRepository,
        private readonly categoryRepository: CategoryEntityRepository,
        private readonly mediaRepository: MediaEntityRepository,
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
            const profilePicture = await this.mediaRepository.findById(command.pictureId);
            if(profilePicture == null) {
                throw new MediaNotFoundException();
            }
            game.picture = profilePicture;
        }
        await this.gameRepository.saveOrUpdate(game);
    }
}
