import {UnsubscribeRequestDto} from "../../dto/request/unsubscribe-request.dto";

export class UnsubscribeCommand {
    public readonly token: string;

    private constructor(
        token: string,
    ) {
        this.token = token;
    }

    public static of(unsubscribeRequestDto: UnsubscribeRequestDto): UnsubscribeCommand {
        const {token} = unsubscribeRequestDto;
        return new UnsubscribeCommand(
            token
        );
    }
}
