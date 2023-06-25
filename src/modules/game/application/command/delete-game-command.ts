import { DeleteGameRequestDto } from '../../dto/request/delete-game-request-dto';

export class DeleteGameCommand {
  public readonly id: string;

  private constructor(id: string) {
    this.id = id;
  }

  public static of(deleteGameRequest: DeleteGameRequestDto): DeleteGameCommand {
    const { gameId } = deleteGameRequest;

    return new DeleteGameCommand(gameId);
  }
}
