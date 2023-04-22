import {QueryHandler} from "@nestjs/cqrs";
import {GetReservationByIdQuery} from "./get-reservation-by-id.query";
import {ReservationEntityRepository} from "../../reservation-entity.repository";
import {GetReservationByIdResponseDto} from "../../dto/response/get-reservation-by-id-response.dto";

@QueryHandler(GetReservationByIdQuery)
export class GetReservationByIdHandler {
    constructor(private readonly reservationRepository: ReservationEntityRepository) {
    }

    async execute(query: GetReservationByIdQuery): Promise<GetReservationByIdResponseDto> {
        const reservation = await this.reservationRepository.findById(query.id);
        return new GetReservationByIdResponseDto(reservation);
    }
}