import {GetReservationByIdRequestDto} from "../../dto/request/get-reservation-by-id-request.dto";

export class GetReservationByUserIdQuery {
    public readonly userId: string;

    private constructor(userId: string) {
        this.userId = userId;
    }

    static of(getReservationByIdRequest: GetReservationByIdRequestDto): GetReservationByUserIdQuery {
        const {userId} = getReservationByIdRequest;
        return new GetReservationByUserIdQuery(userId);
    }
}
