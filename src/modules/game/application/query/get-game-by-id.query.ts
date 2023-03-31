import {GetGameByIdRequestDto} from "../../dto/request/get-game-by-id-request.dto";

export class GetGameByIdQuery {
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    public static of(getGameByIdRequestDto: GetGameByIdRequestDto): GetGameByIdQuery {
        return new GetGameByIdQuery(getGameByIdRequestDto.id);
    }
}
