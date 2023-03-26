import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {EmailConfirmationService} from "../email-confirmation.service";
import {ResendConfirmationMailCommand} from "./resend-confirmation-mail.command";
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {AccountAlreadyVerifiedException} from "../../exception/account-already-verified.exception";
import {UserEntityRepository} from "../../../user/user-entity.repository";

@CommandHandler(ResendConfirmationMailCommand)
export class ResendConfirmationMailHandler implements ICommandHandler<ResendConfirmationMailCommand> {
    constructor(
        private readonly userRepository: UserEntityRepository,
        private readonly emailConfirmationService: EmailConfirmationService
    ) {
    }

    async execute(command: ResendConfirmationMailCommand): Promise<void> {
        const foundUser = await this.userRepository.findByEmail(command.email);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        if(foundUser.isAccountVerified) {
            throw new AccountAlreadyVerifiedException();
        }

        await this.emailConfirmationService.sendVerificationLink(foundUser.email);
    }
}
