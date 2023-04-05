import {CloseAccountRequestDto} from "../../dto/request/close-account-request.dto";

export class CloseAccountCommand {
    public readonly userId: string;

    private constructor(
        userId: string,
    ) {
        this.userId = userId;
    }

    public static of(closeAccountRequestDto: CloseAccountRequestDto): CloseAccountCommand {
        const {userId} = closeAccountRequestDto;
        return new CloseAccountCommand(userId);
    }
}
