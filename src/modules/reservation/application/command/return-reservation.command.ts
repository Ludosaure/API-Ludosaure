import {UpdateReservationRequestDto} from "../../dto/request/update-reservation-request.dto";
import { ReturnReservationRequestDto } from "../../dto/request/return-reservation-request.dto";

export class ReturnReservationCommand {
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    public static of(returnReservationRequestDto: ReturnReservationRequestDto): ReturnReservationCommand {
        const {id} = returnReservationRequestDto;
        return new ReturnReservationCommand(id);
    }
}
