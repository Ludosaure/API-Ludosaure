import {HttpException} from "@nestjs/common";
import {ErrorCode} from "../../../shared/enums/error-code.enum";

export class FaqNotFoundException extends HttpException {
    constructor() {
        super('Faq not found', ErrorCode.NOT_FOUND);
    }
}
