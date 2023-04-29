import {CreateReservationRequestDto} from "../../dto/request/create-reservation-request.dto";

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

    public static of(createReservationRequestDto: CreateReservationRequestDto): CreateReservationCommand {
        const {startDate, endDate, userId, games} = createReservationRequestDto;
        return new CreateReservationCommand(startDate, endDate, userId, games);
    }
}
