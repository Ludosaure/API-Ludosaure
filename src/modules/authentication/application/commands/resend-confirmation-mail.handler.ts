import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';

import {RegisterCommand} from './register.command';
import {MailAlreadyUsedException} from '../../exception/mail-already-used.exception';
import {User} from '../../../../infrastructure/model/user.entity';
import {hash} from 'argon2';
import {UserEntityRepository} from '../../../user/db/user-entity-repository.service';
import {RegisterValidator} from '../register.validator';
import {EmailConfirmationService} from "../email-confirmation.service";
import {ResendConfirmationMailCommand} from "./resend-confirmation-mail.command";
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {AccountAlreadyVerifiedException} from "../../exception/account-already-verified.exception";

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
        if(foundUser.is_account_verified) {
            throw new AccountAlreadyVerifiedException();
        }

        await this.emailConfirmationService.sendVerificationLink(foundUser.email);
    }
}
