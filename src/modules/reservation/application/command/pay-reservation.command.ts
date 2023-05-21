import { PayReservationRequestDto } from "../../dto/request/pay-reservation-request.dto";

export class PayReservationCommand {
    public readonly reservationId: string;

    private constructor(reservationId: string) {
        this.reservationId = reservationId;
    }

    public static of(payReservationRequestDto: PayReservationRequestDto): PayReservationCommand {
        const {reservationId} = payReservationRequestDto;
        return new PayReservationCommand(reservationId);
    }
}
