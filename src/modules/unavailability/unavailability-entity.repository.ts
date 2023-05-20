import {Injectable} from "@nestjs/common";
import { MoreThan, Repository } from "typeorm";
import {Unavailability} from "../../domain/model/unavailability.entity";
import {UnavailabilityRepository} from "../../infrastructure/unavailability.repository";
import {InjectRepository} from "@nestjs/typeorm";
import { Plan } from "../../domain/model/plan.entity";

@Injectable()
export class UnavailabilityEntityRepository extends Repository<Unavailability> implements UnavailabilityRepository {
    constructor(@InjectRepository(Unavailability)
                private unavailabilityRepository: Repository<Unavailability>) {
        super(unavailabilityRepository.target,
            unavailabilityRepository.manager,
            unavailabilityRepository.queryRunner);
    }

    findById(id: string): Promise<Unavailability> {
        return this.findOneBy({id: id});
    }

    findByGameId(gameId: string): Promise<Unavailability[]> {
        return this.find({
                relations: {game: true,},
                select: {
                    id: true,
                    date: true,
                    game: {
                        id: true,
                    }
                },
                where: {game: {id: gameId,},},
            }
        );
    }

    findByGameIdAndDate(gameId: string, date: Date): Promise<Unavailability> {
        return this.findOneBy({
            game: {
                id: gameId,
            },
            date: date,
        });
    }

    findBetweenDates(gameId: string, startDate: Date, endDate: Date): Promise<Unavailability[]> {
        return this.manager
          .createQueryBuilder(Unavailability, 'unavailability')
          .where('unavailability.date BETWEEN :startDate AND :endDate', {startDate: startDate, endDate: endDate})
          .andWhere('unavailability.game_id = :gameId', {gameId: gameId})
          .getMany();
    }

    async saveUnavailability(unavailability: Unavailability): Promise<void> {
        await this.save(unavailability);
    }

    async deleteUnavailability(unavailability: Unavailability): Promise<void> {
        await this.remove(unavailability);
    }
}
