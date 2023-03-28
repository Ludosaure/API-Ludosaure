import {ConfirmAccountRequestDto} from "../../dto/request/confirm-account-request.dto";

export class ConfirmAccountCommand {
    public readonly token: string;

    private constructor(
        token: string,
    ) {
        this.token = token;
    }

    public static of(confirmAccountRequestDto: ConfirmAccountRequestDto): ConfirmAccountCommand {
        const {token} = confirmAccountRequestDto;
        return new ConfirmAccountCommand(
            token
        );
    }
}
