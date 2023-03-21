import {ConfirmAccountRequestDTO} from "../../dto/request/confirm-account-request.dto";

export class ConfirmAccountCommand {
    public readonly token: string;

    private constructor(
        token: string,
    ) {
        this.token = token;
    }

    public static of(confirmAccountRequestDTO: ConfirmAccountRequestDTO): ConfirmAccountCommand {
        const {token} = confirmAccountRequestDTO;
        return new ConfirmAccountCommand(
            token
        );
    }
}
