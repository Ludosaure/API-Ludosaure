import { Injectable } from "@nestjs/common";
import { ReservationRepository } from "../../infrastructure/reservation.repository";
import { Reservation } from "../../domain/model/reservation.entity";
import { LessThan, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "../../domain/model/game.entity";

@Injectable()
export class ReservationEntityRepository extends Repository<Reservation> implements ReservationRepository {
    constructor(@InjectRepository(Reservation)
                private reservationRepository: Repository<Reservation>) {
        super(reservationRepository.target, reservationRepository.manager, reservationRepository.queryRunner);
    }

    findAll(): Promise<Reservation[]> {
        return this.find({
            where: {
                isPaid: true,
            },
            order: {
                endDate: "ASC",
                startDate: "ASC",
            },
            relations: ["user", "games", "appliedPlan", "games.category", "user.profilePicture"],
        });
    }

    findById(reservationId: string): Promise<Reservation> {
        return this.findOne({
            where: {
                id: reservationId
            },
            relations: ["user", "games", "appliedPlan", "user.profilePicture", "games.picture", "games.category", "invoices"]
        });
    }

    findByUserId(userId: string): Promise<Reservation[]> {
        return this.find({
            where: {
                isPaid: true,
                user: {
                    id: userId
                },
            },
            relations: ["user", "games", "appliedPlan", "user.profilePicture", "games.picture", "games.category", "invoices"]
        });
    }

    findByGameIdAndUserId(gameId: string, userId: string): Promise<Reservation[]> {
        return this.findBy({
            user: {
                id: userId
            },
            games: {
                id: gameId
            }
        });
    }

    findCurrentOrFutureReservationsByGameId(gameId: string): Promise<Reservation[]> {
        return this.find({
            where: {
                games: {id: gameId},
                endDate: MoreThan(new Date())
            }
        });
    }

    findByGameAndDate(game: Game, date: Date): Promise<Reservation[]> {
        return this.findBy({
            startDate: LessThan(date),
            endDate: MoreThan(date),
            games: {
                id: game.id
            }
        });
    }

    async findLastDayReservations(): Promise<Reservation[]> {
        const today = new Date();
        // Définir la date de début de la journée actuelle (00:00:00)
        today.setHours(0, 0, 0, 0);

        return await this.reservationRepository
          .createQueryBuilder('reservation')
          .leftJoinAndSelect('reservation.user', 'user')
          .leftJoinAndSelect('reservation.games', 'games')
          .where('reservation.endDate >= :startLastDay', { startLastDay: today })
          .andWhere('reservation.isReturned = false')
          .andWhere('reservation.isCancelled = false')
          .andWhere('reservation.isPaid = true')
          .andWhere('reservation.endDate < :endLastDay', {
              endLastDay: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Ajouter 24 heures pour obtenir la fin de la journée actuelle
          })
          .getMany();
    }

    async findLateReservations(): Promise<Reservation[]> {
        return await this.reservationRepository
          .createQueryBuilder('reservation')
          .leftJoinAndSelect('reservation.user', 'user')
          .leftJoinAndSelect('reservation.games', 'games')
          .where('reservation.isReturned = false')
          .andWhere('reservation.isCancelled = false')
          .andWhere('reservation.isPaid = true')
          .getMany();
    }

    async saveOrUpdate(reservation: Reservation): Promise<Reservation> {
        return await this.save(reservation);
    }

    async deleteReservation(reservation: Reservation): Promise<void> {
        await this.remove(reservation);
    }
}
