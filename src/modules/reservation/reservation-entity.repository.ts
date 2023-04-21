import {Injectable} from "@nestjs/common";
import {ReservationRepository} from "../../infrastructure/reservation.repository";
import {Reservation} from "../../domain/model/reservation.entity";
import {Repository} from "typeorm";
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
        return this.findOneBy({id: reservationId});
    }

    findByUserId(userId: string): Promise<Reservation[]> {
        return this.findBy({user: {id: userId}});
    }

    async saveOrUpdate(reservation: Reservation): Promise<void> {
        await this.save(reservation);
    }

    async deleteReservation(reservation: Reservation): Promise<void> {
        await this.remove(reservation);
    }
}
