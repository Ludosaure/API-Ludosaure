import {GetReservationByIdRequestDto} from "../../dto/request/get-reservation-by-id-request.dto";

export class GetReservationByIdQuery {
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    static of(getReservationByIdRequest: GetReservationByIdRequestDto): GetReservationByIdQuery {
        const {reservationId} = getReservationByIdRequest;
        return new GetReservationByIdQuery(reservationId);
    }
}
