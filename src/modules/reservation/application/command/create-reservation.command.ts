import {CreateReservationRequestDto} from "../../dto/request/create-reservation-request.dto";
import { User } from "../../../../domain/model/user.entity";

export class CreateReservationCommand {
    public readonly startDate: Date;
    public readonly endDate: Date;
    public readonly userId: string;
    public readonly games: string[];

    private constructor(startDate: Date, endDate: Date, userId: string, games: string[]) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
        this.games = games;
    }

    public static of(createReservationRequestDto: CreateReservationRequestDto, user: User): CreateReservationCommand {
        const {startDate, endDate, games} = createReservationRequestDto;
        return new CreateReservationCommand(startDate, endDate, user.id, games);
    }
}
