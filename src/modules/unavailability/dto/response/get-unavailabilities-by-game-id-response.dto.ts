import {Unavailability} from "../../../../domain/model/unavailability.entity";

export class GetUnavailabilitiesByGameIdResponseDto {
    public readonly unavailabilities: Unavailability[];

    constructor(unavailabilities: Unavailability[]) {
        this.unavailabilities = unavailabilities;
    }
}
