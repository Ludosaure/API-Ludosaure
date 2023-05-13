import {CreateGameRequestDto} from "../../dto/request/create-game-request.dto";

export class CreateGameCommand {
    public readonly name: string;
    public readonly description: string;
    public readonly nbPlayersMin: number;
    public readonly nbPlayersMax: number;
    public readonly averageDuration: number;
    public readonly ageMin: number;
    public readonly weeklyAmount: number;
    public readonly categoryId: string;
    public readonly pictureId: string;

    private constructor(name: string, description: string, nbPlayersMin: number, nbPlayersMax: number,
                averageDuration: number, ageMin: number, weeklyAmount: number, categoryId: string, pictureId: string) {
        this.name = name;
        this.description = description;
        this.nbPlayersMin = nbPlayersMin;
        this.nbPlayersMax = nbPlayersMax;
        this.averageDuration = averageDuration;
        this.ageMin = ageMin;
        this.weeklyAmount = weeklyAmount;
        this.categoryId = categoryId;
        this.pictureId = pictureId;
    }

    public static of(createGameRequest: CreateGameRequestDto): CreateGameCommand {
        const {
            name,
            description,
            nbPlayersMin,
            nbPlayersMax,
            averageDuration,
            ageMin,
            weeklyAmount,
            categoryId,
            pictureId
        } = createGameRequest;
        return new CreateGameCommand(name, description, nbPlayersMin, nbPlayersMax,
            averageDuration, ageMin, weeklyAmount, categoryId, pictureId);
    }
}
