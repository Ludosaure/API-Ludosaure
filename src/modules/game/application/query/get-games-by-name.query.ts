import {GetGamesByNameRequestDto} from "../../dto/request/get-games-by-name-request.dto";

export class GetGamesByNameQuery {
  public readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }

    public static of(getGamesByNameRequest: GetGamesByNameRequestDto): GetGamesByNameQuery {
        const {name} = getGamesByNameRequest;
        return new GetGamesByNameQuery(name);
    }
}
