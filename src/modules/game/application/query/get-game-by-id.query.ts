import {GetGameByIdRequestDto} from "../../dto/request/get-game-by-id-request.dto";
import {User} from "../../../../domain/model/user.entity";

export class GetGameByIdQuery {
    public readonly id: string;
    public readonly user: User;

    private constructor(id: string, user: User) {
        this.id = id;
        this.user = user;
    }

    public static of(getGameByIdRequestDto: GetGameByIdRequestDto, user: User): GetGameByIdQuery {
        return new GetGameByIdQuery(getGameByIdRequestDto.id, user);
    }
}
