import {ResendConfirmationMailRequestDTO} from "../../dto/request/resend-confirmation-mail-request.dto";

export class ResendConfirmationMailCommand {
    public readonly email: string;

    private constructor(
        email: string,
    ) {
        this.email = email;
    }

    public static of(resendConfirmationMailRequest: ResendConfirmationMailRequestDTO): ResendConfirmationMailCommand {
        const {email} = resendConfirmationMailRequest;
        return new ResendConfirmationMailCommand(email);
    }
}
