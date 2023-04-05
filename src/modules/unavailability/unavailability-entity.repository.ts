import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Unavailability} from "../../domain/model/unavailability.entity";
import {UnavailabilityRepository} from "../../infrastructure/unavailability.repository";
import {InjectRepository} from "@nestjs/typeorm";

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
                where: {
                    game: {
                        id: gameId,
                    },
                },
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

    async saveUnavailability(unavailability: Unavailability): Promise<void> {
        await this.save(unavailability);
    }

    async deleteUnavailability(unavailability: Unavailability): Promise<void> {
        await this.remove(unavailability);
    }
}
