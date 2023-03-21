import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {UserEntityRepository} from '../../db/user-entity-repository.service';
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {UpdateUserCommand} from "./update-user.command";
import {PasswordValidator} from "../../../../shared/password-validator.service";
import {hash} from "argon2";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        private readonly userRepository: UserEntityRepository,
        private readonly passwordValidator: PasswordValidator,
    ) {}

    async execute(command: UpdateUserCommand): Promise<void> {
        const foundUser = await this.userRepository.findById(command.userId);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }

        if (command.password != null && command.confirmPassword != null) {
            this.passwordValidator.validate(command.password, command.confirmPassword);
        }

        if (command.password != null)
            foundUser.password = await hash(command.password);
        if (command.phoneNumber != null)
            foundUser.phone = command.phoneNumber;
        if (command.pseudo != null)
            foundUser.pseudo = command.pseudo;
        if (command.profilePicture != null)
            foundUser.profile_picture_path = command.profilePicture;
        if (command.hasEnabledMailNotifications != null)
            foundUser.has_enabled_mail_notifications = command.hasEnabledMailNotifications;
        if (command.hasEnabledPhoneNotifications != null)
            foundUser.has_enabled_phone_notifications = command.hasEnabledPhoneNotifications;
        await this.userRepository.saveOrUpdateUser(foundUser);
    }
}
