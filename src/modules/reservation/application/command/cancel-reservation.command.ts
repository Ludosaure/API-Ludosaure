import { CancelReservationRequestDto } from "../../dto/request/cancel-reservation-request.dto";

export class CancelReservationCommand {
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    public static of(cancelReservationRequestDto: CancelReservationRequestDto): CancelReservationCommand {
        const {id} = cancelReservationRequestDto;
        return new CancelReservationCommand(id);
    }
}
