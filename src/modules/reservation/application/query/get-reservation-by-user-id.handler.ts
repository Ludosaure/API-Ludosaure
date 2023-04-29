import {QueryHandler} from "@nestjs/cqrs";
import {ReservationEntityRepository} from "../../reservation-entity.repository";
import {GetReservationByUserIdQuery} from "./get-reservation-by-user-id.query";
import {GetReservationByUserIdResponseDto} from "../../dto/response/get-reservation-by-user-id-response.dto";

@QueryHandler(GetReservationByUserIdQuery)
export class GetReservationByUserIdHandler {
    constructor(private readonly reservationRepository: ReservationEntityRepository) {
    }

    async execute(query: GetReservationByUserIdQuery): Promise<GetReservationByUserIdResponseDto> {
        const reservations = await this.reservationRepository.findByUserId(query.id);
        return new GetReservationByUserIdResponseDto(reservations);
    }
}
