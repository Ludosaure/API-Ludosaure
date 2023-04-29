import {GetReservationByIdRequestDto} from "../../dto/request/get-reservation-by-id-request.dto";

export class GetReservationByUserIdQuery {
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    static of(getReservationByIdRequest: GetReservationByIdRequestDto): GetReservationByUserIdQuery {
        const {id} = getReservationByIdRequest;
        return new GetReservationByUserIdQuery(id);
    }
}
