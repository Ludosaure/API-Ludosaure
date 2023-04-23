import {Injectable} from "@nestjs/common";
import {ReservationRepository} from "../../infrastructure/reservation.repository";
import {Reservation} from "../../domain/model/reservation.entity";
import {LessThan, MoreThan, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ReservationEntityRepository extends Repository<Reservation> implements ReservationRepository {
    constructor(@InjectRepository(Reservation)
                private reservationRepository: Repository<Reservation>) {
        super(reservationRepository.target, reservationRepository.manager, reservationRepository.queryRunner);
    }

    findAll(): Promise<Reservation[]> {
        return this.find({
            order: {
                startDate: "DESC",
                endDate: "DESC"
            }
        });
    }

    findById(reservationId: string): Promise<Reservation> {
        return this.findOne({
            where: {
                id: reservationId
            },
            relations: ["user", "games", "appliedPlan"]
        });
    }

    findByUserId(userId: string): Promise<Reservation[]> {
        return this.findBy({user: {id: userId}});
    }

    findCurrentReservationsByGameId(gameId: string): Promise<Reservation[]> {
        return this.find({
            where: {
                games: {id: gameId},
                startDate: LessThan(new Date()),
                endDate: MoreThan(new Date())
            }
        });
    }

    async saveOrUpdate(reservation: Reservation): Promise<void> {
        await this.save(reservation);
    }

    async deleteReservation(reservation: Reservation): Promise<void> {
        await this.remove(reservation);
    }
}
