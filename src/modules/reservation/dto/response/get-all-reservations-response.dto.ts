import {Reservation} from "../../../../domain/model/reservation.entity";

export class GetAllReservationsResponseDto {
    readonly reservations: Reservation[];
    constructor(reservations: Reservation[]) {
        this.reservations = reservations;
    }
}
