import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {User} from '../../../../infrastructure/model/user.entity';
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
    ) {
    }

    async execute(command: UpdateUserCommand): Promise<void> {
        const foundUser = await this.userRepository.findById(command.userId);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }

        if (command.password != null && command.confirmPassword != null) {
            this.passwordValidator.validate(command.password, command.confirmPassword);
        }

        const user = new User();
        user.user_id = foundUser.user_id;
        if (command.password != null)
            user.password = await hash(command.password);
        if (command.phoneNumber != null)
            user.phone = command.phoneNumber;
        if (command.pseudo != null)
            user.pseudo = command.pseudo;
        if (command.profilePicture != null)
            user.profile_picture_path = command.profilePicture;
        if (command.hasDisabledMailNotifications != null)
            user.has_disabled_mail_notifications = command.hasDisabledMailNotifications;
        if (command.hasDisabledPhoneNotifications != null)
            user.has_disabled_phone_notifications = command.hasDisabledPhoneNotifications;
        await this.userRepository.saveOrUpdateUser(user);
    }
}
