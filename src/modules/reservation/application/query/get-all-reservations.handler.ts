import {QueryHandler} from "@nestjs/cqrs";
import {GetAllReservationsQuery} from "./get-all-reservations.query";
import {ReservationRepository} from "../../../../infrastructure/reservation.repository";
import {GetAllReservationsResponseDto} from "../../dto/response/get-all-reservations-response.dto";

@QueryHandler(GetAllReservationsQuery)
export class GetAllReservationsHandler {
    constructor(private readonly reservationRepository: ReservationRepository) {
    }

    async execute(query: GetAllReservationsQuery): Promise<GetAllReservationsResponseDto> {
        const reservations = await this.reservationRepository.findAll();
        return new GetAllReservationsResponseDto(reservations);
    }
}
