import {UnsubscribeRequestDTO} from "../../dto/request/unsubscribe-request.dto";

export class UnsubscribeCommand {
    public readonly token: string;

    private constructor(
        token: string,
    ) {
        this.token = token;
    }

    public static of(unsubscribeRequestDTO: UnsubscribeRequestDTO): UnsubscribeCommand {
        const {token} = unsubscribeRequestDTO;
        return new UnsubscribeCommand(
            token
        );
    }
}
