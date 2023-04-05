import {HttpException} from "@nestjs/common";
import {ErrorCode} from "../../../shared/enums/error-code.enum";

export class CategoryAlreadyExistsException extends HttpException {
    constructor() {
        super('Category already exists', ErrorCode.CONFLICT);
    }
}
