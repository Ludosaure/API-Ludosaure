import {QueryHandler} from "@nestjs/cqrs";
import {GetAllReservationsQuery} from "./get-all-reservations.query";
import {GetAllReservationsResponseDto} from "../../dto/response/get-all-reservations-response.dto";
import {ReservationEntityRepository} from "../../reservation-entity.repository";

@QueryHandler(GetAllReservationsQuery)
export class GetAllReservationsHandler {
    constructor(private readonly reservationRepository: ReservationEntityRepository) {
    }

    async execute(): Promise<GetAllReservationsResponseDto> {
        const reservations = await this.reservationRepository.findAll();
        return new GetAllReservationsResponseDto(reservations);
    }
}
