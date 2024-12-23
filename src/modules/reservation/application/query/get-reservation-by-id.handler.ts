import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetReservationByIdQuery} from "./get-reservation-by-id.query";
import {ReservationEntityRepository} from "../../reservation-entity.repository";
import {GetReservationByIdResponseDto} from "../../dto/response/get-reservation-by-id-response.dto";
import { ReservationNotFoundException } from "../../exceptions/reservation-not-found.exception";

@QueryHandler(GetReservationByIdQuery)
export class GetReservationByIdHandler implements IQueryHandler<GetReservationByIdQuery> {
    constructor(private readonly reservationRepository: ReservationEntityRepository) {
    }

    async execute(query: GetReservationByIdQuery): Promise<GetReservationByIdResponseDto> {
        const reservation = await this.reservationRepository.findById(query.id);
        if(reservation == null) {
          throw new ReservationNotFoundException();
        }
        return new GetReservationByIdResponseDto(reservation);
    }
}
