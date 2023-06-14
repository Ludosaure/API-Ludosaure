import { GetReservationByUserIdRequestDto } from "../../dto/request/get-reservation-by-user-id-request.dto";

export class GetReservationByUserIdQuery {
    public readonly userId: string;

    private constructor(userId: string) {
        this.userId = userId;
    }

    static of(getReservationByUserIdRequestDto: GetReservationByUserIdRequestDto): GetReservationByUserIdQuery {
        const { userId } = getReservationByUserIdRequestDto;
        return new GetReservationByUserIdQuery(userId);
    }
}
