import {UpdateReservationRequestDto} from "../../dto/request/update-reservation-request.dto";

export class UpdateReservationCommand {
    public readonly id: string;
    public readonly endDate: Date;
    public readonly isReturned: boolean;
    public readonly isCancelled: boolean;

    private constructor(id: string, endDate: Date, isReturned: boolean, isCancelled: boolean) {
        this.id = id;
        this.endDate = endDate;
        this.isReturned = isReturned;
        this.isCancelled = isCancelled;
    }

    public static of(updateReservationRequest: UpdateReservationRequestDto): UpdateReservationCommand {
        const {id, endDate, isReturned, isCancelled} = updateReservationRequest;
        return new UpdateReservationCommand(id, endDate, isReturned, isCancelled);
    }
}
