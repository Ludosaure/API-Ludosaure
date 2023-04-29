import {Reservation} from "../../../../domain/model/reservation.entity";

export class GetReservationByUserIdResponseDto {
    readonly reservations: Reservation[];
    constructor(reservations: Reservation[]) {
        this.reservations = reservations;
    }
}
