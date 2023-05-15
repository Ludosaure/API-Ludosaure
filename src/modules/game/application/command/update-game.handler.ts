import { CommandHandler } from "@nestjs/cqrs";
import { GameEntityRepository } from "../../game-entity.repository";
import { CategoryEntityRepository } from "../../../category/category-entity.repository";
import { CategoryNotFoundException } from "../../../../shared/exceptions/category-not-found.exception";
import { UpdateGameCommand } from "./update-game.command";
import { GameNotFoundException } from "../../../../shared/exceptions/game-not-found.exception";
import { ReservationEntityRepository } from "../../../reservation/reservation-entity.repository";
import { GameCurrentlyBookedExceptions } from "../../exceptions/game-currently-booked.exceptions";
import { CannotUpdateArchivedGameException } from "../../exceptions/cannot-update-archived-game.exception";
import { Media } from "../../../../domain/model/media.entity";

@CommandHandler(UpdateGameCommand)
export class UpdateGameHandler {

  constructor(
    private readonly gameRepository: GameEntityRepository,
    private readonly categoryRepository: CategoryEntityRepository,
    private readonly reservationRepository: ReservationEntityRepository
  ) {
  }

  async execute(command: UpdateGameCommand): Promise<void> {
    const foundGame = await this.gameRepository.findOneBy({ id: command.id });
    if (foundGame == null) {
      throw new GameNotFoundException();
    }
    if(foundGame.isArchived) {
      throw new CannotUpdateArchivedGameException();
    }

    if (command.name != null)
      foundGame.name = command.name;
    if (command.description != null)
      foundGame.description = command.description;
    if (command.nbPlayersMin != null)
      foundGame.nbPlayersMin = command.nbPlayersMin;
    if (command.nbPlayersMax != null)
      foundGame.nbPlayersMax = command.nbPlayersMax;
    if (command.averageDuration != null)
      foundGame.averageDuration = command.averageDuration;
    if (command.ageMin != null)
      foundGame.ageMin = command.ageMin;
    if (command.weeklyAmount != null)
      foundGame.weeklyAmount = command.weeklyAmount;

    if (command.isArchived != null) {
      const reservations = await this.reservationRepository.findCurrentOrFutureReservationsByGameId(foundGame.id);
      if (reservations.length > 0) {
        throw new GameCurrentlyBookedExceptions();
      }
    }

    if (command.categoryId != null) {
      const foundCategory = await this.categoryRepository.findOneBy({ id: command.categoryId });
      if (foundCategory == null) {
        throw new CategoryNotFoundException();
      }
      foundGame.category = foundCategory;
    }

    if(command.pictureId != null) {
      const picture = new Media();
      picture.id = command.pictureId;
      foundGame.picture = picture;
    }
    await this.gameRepository.saveOrUpdate(foundGame);
  }
}
