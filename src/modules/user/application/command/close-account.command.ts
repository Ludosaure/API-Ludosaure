import {CloseAccountRequestDTO} from "../../dto/request/close-account-request.dto";

export class CloseAccountCommand {
    public readonly userId: string;

    private constructor(
        userId: string,
    ) {
        this.userId = userId;
    }

    public static of(closeAccountRequestDTO: CloseAccountRequestDTO): CloseAccountCommand {
        const {userId} = closeAccountRequestDTO;
        return new CloseAccountCommand(userId);
    }
}
