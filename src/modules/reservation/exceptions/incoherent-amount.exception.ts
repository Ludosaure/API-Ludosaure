import {HttpException, HttpStatus} from "@nestjs/common";

export class IncoherentAmountException extends HttpException {
    constructor(amount: number) {
        super("The amount is incoherent: " + amount, HttpStatus.BAD_REQUEST);
    }
}
