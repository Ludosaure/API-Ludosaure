import {UpdateUserRequestDTO} from "../../dto/request/update-user-request.dto";

export class UpdateUserCommand {
    public readonly userId: string;
    public readonly password: string;
    public readonly confirmPassword: string;
    public readonly phoneNumber: string;
    public readonly pseudo: string;
    public readonly profilePicture: string;
    public readonly hasDisabledMailNotifications: boolean;
    public readonly hasDisabledPhoneNotifications: boolean;


    private constructor(
        userId: string,
        password: string,
        confirmPassword: string,
        phoneNumber: string,
        pseudo: string,
        profilePicture: string,
        hasDisabledMailNotifications: boolean,
        hasDisabledPhoneNotifications: boolean,
    ) {
        this.userId = userId;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.phoneNumber = phoneNumber;
        this.pseudo = pseudo;
        this.profilePicture = profilePicture;
        this.hasDisabledMailNotifications = hasDisabledMailNotifications;
        this.hasDisabledPhoneNotifications = hasDisabledPhoneNotifications;
    }

    public static of(updateUserRequestDTO: UpdateUserRequestDTO): UpdateUserCommand {
        const {
            userId,
            password,
            confirmPassword,
            phoneNumber,
            pseudo,
            profilePicture,
            hasDisabledMailNotifications,
            hasDisabledPhoneNotifications
        } = updateUserRequestDTO;
        return new UpdateUserCommand(
            userId,
            password,
            confirmPassword,
            phoneNumber, pseudo,
            profilePicture,
            hasDisabledMailNotifications,
            hasDisabledPhoneNotifications);
    }
}
