import { UpdateGameRequestDto } from "../../dto/request/update-game-request.dto";

export class UpdateGameCommand {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly nbPlayersMin: number;
  public readonly nbPlayersMax: number;
  public readonly averageDuration: number;
  public readonly ageMin: number;
  public readonly weeklyAmount: number;
  public readonly isArchived: boolean;
  public readonly categoryId: string;

  private constructor(id: string, name: string, description: string, nbPlayersMin: number, nbPlayersMax: number,
                      averageDuration: number, ageMin: number, weeklyAmount: number, isArchived: boolean, categoryId: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.nbPlayersMin = nbPlayersMin;
    this.nbPlayersMax = nbPlayersMax;
    this.averageDuration = averageDuration;
    this.ageMin = ageMin;
    this.weeklyAmount = weeklyAmount;
    this.isArchived = isArchived;
    this.categoryId = categoryId;
  }

  public static of(updateGameRequestDto: UpdateGameRequestDto): UpdateGameCommand {
    const {
      id,
      name,
      description,
      nbPlayersMin,
      nbPlayersMax,
      averageDuration,
      ageMin,
      weeklyAmount,
      isArchived,
      categoryId
    } = updateGameRequestDto;
    return new UpdateGameCommand(id, name, description, nbPlayersMin, nbPlayersMax, averageDuration,
      ageMin, weeklyAmount, isArchived, categoryId);
  }
}
