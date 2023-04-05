import {HttpException} from "@nestjs/common";
import {ErrorCode} from "../../../shared/enums/error-code.enum";

export class UnavailabilityNotFoundException extends HttpException {
    constructor() {
        super('Unavailability not found', ErrorCode.NOT_FOUND);
    }
}
