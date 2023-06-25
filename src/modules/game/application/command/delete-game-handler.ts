import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GameEntityRepository } from '../../game-entity.repository';
import { DeleteGameCommand } from './delete-game-command';
import { Game } from '../../../../domain/model/game.entity';
import { GameNotFoundException } from '../../../../shared/exceptions/game-not-found.exception';
import { CannotDeleteCurrentlyBookedGameException } from '../../exceptions/cannot-delete-currently-booked-game.exception';
import { CannotDeleteUnavailableGameException } from '../../exceptions/cannot-delete-unavailable-game.exception';

@CommandHandler(DeleteGameCommand)
export class DeleteGameHandler implements ICommandHandler<DeleteGameCommand> {
  constructor(private readonly repository: GameEntityRepository) {}

  async execute(command: DeleteGameCommand): Promise<void> {
    const game: Game = await this.repository.findById(command.id);

    if (game == null) {
      throw new GameNotFoundException();
    }

    if (game.hasUnfinishedReservations()) {
      throw new CannotDeleteCurrentlyBookedGameException();
    }

    if(game.hasUpcommingUnavailibilities()) {
      throw new CannotDeleteUnavailableGameException();
    }

    await this.repository.deleteGame(game);
  }
}
