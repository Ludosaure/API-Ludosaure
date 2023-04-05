import {UpdateUserRequestDto} from "../../dto/request/update-user-request.dto";

export class UpdateUserCommand {
    public readonly userId: string;
    public readonly password: string;
    public readonly confirmPassword: string;
    public readonly phoneNumber: string;
    public readonly pseudo: string;
    public readonly profilePicture: string;
    public readonly hasEnabledMailNotifications: boolean;
    public readonly hasEnabledPhoneNotifications: boolean;


    private constructor(
        userId: string,
        password: string,
        confirmPassword: string,
        phoneNumber: string,
        pseudo: string,
        profilePicture: string,
        hasEnabledMailNotifications: boolean,
        hasEnabledPhoneNotifications: boolean,
    ) {
        this.userId = userId;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.phoneNumber = phoneNumber;
        this.pseudo = pseudo;
        this.profilePicture = profilePicture;
        this.hasEnabledMailNotifications = hasEnabledMailNotifications;
        this.hasEnabledPhoneNotifications = hasEnabledPhoneNotifications;
    }

    public static of(updateUserRequestDto: UpdateUserRequestDto): UpdateUserCommand {
        const {
            userId,
            password,
            confirmPassword,
            phoneNumber,
            pseudo,
            profilePicture,
            hasEnabledMailNotifications,
            hasEnabledPhoneNotifications
        } = updateUserRequestDto;
        return new UpdateUserCommand(
            userId,
            password,
            confirmPassword,
            phoneNumber, pseudo,
            profilePicture,
            hasEnabledMailNotifications,
            hasEnabledPhoneNotifications);
    }
}
