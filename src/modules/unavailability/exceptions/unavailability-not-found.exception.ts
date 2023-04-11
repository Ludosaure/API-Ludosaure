import {HttpException, HttpStatus} from "@nestjs/common";

export class UnavailabilityNotFoundException extends HttpException {
    constructor() {
        super('Unavailability not found', HttpStatus.NOT_FOUND);
    }
}
