import {UpdateUserRequestDto} from "../../dto/request/update-user-request.dto";

export class UpdateUserCommand {
    public readonly userId: string;
    public readonly password: string;
    public readonly confirmPassword: string;
    public readonly phoneNumber: string;
    public readonly pseudo: string;
    public readonly hasEnabledMailNotifications: boolean;
    public readonly profilePictureId: string;


    private constructor(
        userId: string,
        password: string,
        confirmPassword: string,
        phoneNumber: string,
        pseudo: string,
        hasEnabledMailNotifications: boolean,
        profilePictureId: string
    ) {
        this.userId = userId;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.phoneNumber = phoneNumber;
        this.pseudo = pseudo;
        this.hasEnabledMailNotifications = hasEnabledMailNotifications;
        this.profilePictureId = profilePictureId;
    }

    public static of(updateUserRequestDto: UpdateUserRequestDto): UpdateUserCommand {
        const {
            userId,
            password,
            confirmPassword,
            phoneNumber,
            pseudo,
            hasEnabledMailNotifications,
            profilePictureId
        } = updateUserRequestDto;
        return new UpdateUserCommand(
            userId,
            password,
            confirmPassword,
            phoneNumber, pseudo,
            hasEnabledMailNotifications,
            profilePictureId);
    }
}
