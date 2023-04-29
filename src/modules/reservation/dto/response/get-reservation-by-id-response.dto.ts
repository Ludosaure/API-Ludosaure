import {Reservation} from "../../../../domain/model/reservation.entity";

export class GetReservationByIdResponseDto {
    readonly reservation: Reservation;
    constructor(reservation: Reservation) {
        this.reservation = reservation;
    }
}
