import {DeleteGameRequestDto} from "../../dto/request/delete-game-request.dto";

export class DeleteGameCommand {
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    public static of(deleteGameRequestDto: DeleteGameRequestDto): DeleteGameCommand {
        const {id} = deleteGameRequestDto;
        return new DeleteGameCommand(id);
    }
}
