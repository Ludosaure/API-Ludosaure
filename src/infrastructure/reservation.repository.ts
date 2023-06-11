import {Reservation} from "../domain/model/reservation.entity";

export interface ReservationRepository {
    findAll(): Promise<Reservation[]>;

    findById(reservationId: string): Promise<Reservation>;

    findByUserId(userId: string): Promise<Reservation[]>;

    findByGameIdAndUserId(gameId: string, userId: string): Promise<Reservation[]>;

    findCurrentOrFutureReservationsByGameId(gameId: string): Promise<Reservation[]>;

    findByDate(date: Date): Promise<Reservation[]>;

    findLastDayReservations(): Promise<Reservation[]>;

    findLateReservations(): Promise<Reservation[]>;

    saveOrUpdate(reservation: Reservation): Promise<void>;

    deleteReservation(reservation: Reservation): Promise<void>;
}
