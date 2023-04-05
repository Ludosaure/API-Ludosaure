import {Unavailability} from "../domain/model/unavailability.entity";

export interface UnavailabilityRepository {

    findById(id: string): Promise<Unavailability>;

    findByGameId(gameId: string): Promise<Unavailability[]>;

    findByGameIdAndDate(gameId: string, date: Date): Promise<Unavailability>;

    saveUnavailability(unavailability: Unavailability): Promise<void>;

    deleteUnavailability(unavailability: Unavailability): Promise<void>;
}
