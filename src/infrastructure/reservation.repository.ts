import {Reservation} from "../domain/model/reservation.entity";

export interface ReservationRepository {
    findAll(): Promise<Reservation[]>;

    findById(reservationId: string): Promise<Reservation>;

    findByUserId(userId: string): Promise<Reservation[]>;

    findCurrentReservationsByGameId(gameId: string): Promise<Reservation[]>;

    saveOrUpdate(reservation: Reservation): Promise<void>;

    deleteReservation(reservation: Reservation): Promise<void>;
}
