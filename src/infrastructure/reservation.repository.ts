import {Reservation} from "../domain/model/reservation.entity";
import { Game } from "../domain/model/game.entity";

export interface ReservationRepository {
    findAll(): Promise<Reservation[]>;

    findById(reservationId: string): Promise<Reservation>;

    findByUserId(userId: string): Promise<Reservation[]>;

    findByGameIdAndUserId(gameId: string, userId: string): Promise<Reservation[]>;

    findCurrentOrFutureReservationsByGameId(gameId: string): Promise<Reservation[]>;

    findByGameAndDate(game: Game, date: Date): Promise<Reservation[]>;

    findLastDayReservations(): Promise<Reservation[]>;

    findLateReservations(): Promise<Reservation[]>;

    saveOrUpdate(reservation: Reservation): Promise<Reservation>;

    deleteReservation(reservation: Reservation): Promise<void>;
}
