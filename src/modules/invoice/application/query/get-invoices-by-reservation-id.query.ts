import { GetInvoicesByReservationIdRequestDto } from "../../dto/request/get-invoices-by-reservation-id-request.dto";

export class GetInvoicesByReservationIdQuery {
  public readonly reservationId: string;
  private constructor(reservationId: string) {
    this.reservationId = reservationId;
  }
  static of(getInvoicesByReservationIdRequestDto: GetInvoicesByReservationIdRequestDto): GetInvoicesByReservationIdQuery {
    const { reservationId } = getInvoicesByReservationIdRequestDto;
    return new GetInvoicesByReservationIdQuery(reservationId);
  }
}
