import {UpdateReservationRequestDto} from "../../dto/request/update-reservation-request.dto";

export class UpdateReservationCommand {
    public readonly id: string;
    public readonly startDate: Date;
    public readonly endDate: Date;
    public readonly isReturned: boolean;
    public readonly isCancelled: boolean;

    private constructor(id: string, startDate: Date, endDate: Date, isReturned: boolean, isCancelled: boolean) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isReturned = isReturned;
        this.isCancelled = isCancelled;
    }

    public static of(updateReservationRequest: UpdateReservationRequestDto): UpdateReservationCommand {
        const {id, startDate, endDate, isReturned, isCancelled} = updateReservationRequest;
        return new UpdateReservationCommand(id, startDate, endDate, isReturned, isCancelled);
    }
}
