import {HttpException} from "@nestjs/common";
import {ErrorCode} from "../../../shared/enums/error-code.enum";

export class PlanNotFoundException extends HttpException {
    constructor() {
        super('Plan not found', ErrorCode.NOT_FOUND);
    }
}
